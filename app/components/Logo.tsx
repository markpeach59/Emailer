export function Logo() {
    return (
      <img 
        src="/images/Equicise.png" 
        alt="Equicise" 
        className="h-14 w-auto" 
        onError={(e) => {
          console.error("Error loading logo image");
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  } 