
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-blue p-4">
      <div className="glass-panel p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyber-blue-light/50 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-cyber-red" />
        </div>
        <h1 className="text-4xl font-bold mb-4 cyber-gradient-text">404</h1>
        <p className="text-xl text-gray-300 mb-6">Security Perimeter Breach</p>
        <p className="text-sm text-gray-400 mb-8">
          The resource you're looking for cannot be accessed or doesn't exist. 
          This access attempt has been logged.
        </p>
        <Link to="/" className="cyber-button py-2 px-8 inline-flex items-center">
          <Home className="w-4 h-4 mr-2" />
          Return to Command Center
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
