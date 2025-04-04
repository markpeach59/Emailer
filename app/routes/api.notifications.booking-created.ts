// app/routes/api/notifications/booking-created.js
import { json } from "@remix-run/node";
import Queue from 'bull';
import type { ActionFunctionArgs } from "@remix-run/node";

// Create a connection to Redis Cloud with retry options
const emailQueue = new Queue('email-notifications', {
  redis: {
    username: 'default',
    password: 'bQ6Ilz3OSMkrLMozF2dnYQ4QAW1fltla',
    host: 'redis-11223.c338.eu-west-2-1.ec2.redns.redis-cloud.com',
    port: 11223,
    maxRetriesPerRequest: 3,
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    connectTimeout: 10000,
    enableReadyCheck: true
  }
});

// Handle queue events
emailQueue.on('error', (error) => {
  console.error('Queue error:', error);
});

emailQueue.on('failed', (job, error) => {
  console.error('Job failed:', job.id, error);
});

emailQueue.on('completed', (job) => {
  console.log('Job completed:', job.id, job.data);
});

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const data = await request.json();
    const { notificationType, email, name, userId, bookingDetails } = data;
    
    console.log("Received notification request:", {
      type: notificationType,
      email,
      name,
      userId,
      bookingDetails
    });

    // Validate the data
    if (!email || !name || !notificationType) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }
    
    // Validate notification type
    const validTypes = ['booking-confirmation', 'booking-reschedule', 'booking-cancellation', 'first-visit'];
    if (!validTypes.includes(notificationType)) {
      return json({ error: "Invalid notification type" }, { status: 400 });
    }
    
    // Type-specific validation
    if (['booking-confirmation', 'booking-reschedule', 'booking-cancellation'].includes(notificationType) 
        && !bookingDetails) {
      return json({ error: "Missing booking details" }, { status: 400 });
    }
    
    // Add job to the queue with the appropriate type
    const job = await emailQueue.add(notificationType, {
      email,
      name,
      userId,
      bookingDetails,
      timestamp: new Date().toISOString()
    }, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000
      }
    });

    console.log("Job added to queue:", {
      jobId: job.id,
      type: notificationType,
      data: job.data
    });
    
    return json({ success: true, jobId: job.id });
    
  } catch (error) {
    console.error("Failed to queue email notification:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
}