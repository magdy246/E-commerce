import { Toaster } from "react-hot-toast";

export default function ToasterComponent() {
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 5000,
          position: "bottom-right",
          style: {
            background: "linear-gradient(135deg, #1e3c72, #2a5298)", 
            color: "#f1f1f1",                                       
            fontSize: "15px",                                        
            padding: "14px 20px",                                    
            borderRadius: "12px",                                    
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",            
            border: "1px solid rgba(255, 255, 255, 0.2)",            
          },
          success: {
            style: {
              background: "linear-gradient(135deg, #56ab2f, #a8e063)", 
              color: "#ffffff",                                        
            },
            iconTheme: {
              primary: "#ffffff",                                      
              secondary: "#56ab2f",                                    
            },
          },
          error: {
            style: {
              background: "linear-gradient(135deg, #e53935, #e35d5b)", 
              color: "#ffffff",                                        
            },
            iconTheme: {
              primary: "#ffffff",                                      
              secondary: "#e53935",                                    
            },
          },
        }}
      />
    </>
  );
}
