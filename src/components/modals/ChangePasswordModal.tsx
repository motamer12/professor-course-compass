
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Password validation regex: at least one uppercase, one lowercase, one digit, 
// one special character (@$!%*?&), minimum 6 characters
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const ChangePasswordModal = ({
  isOpen,
  onClose,
}: ChangePasswordModalProps) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    
    // Validate password as the user types
    if (name === "newPassword" && value) {
      if (!passwordRegex.test(value)) {
        setErrors((prev) => ({ 
          ...prev, 
          newPassword: "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character (@$!%*?&), and be at least 6 characters long"
        }));
      }
    }
    
    // Check if passwords match as the user types in confirm password
    if (name === "confirmPassword" && value) {
      if (value !== formData.newPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Current password is required";
      isValid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (!passwordRegex.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character (@$!%*?&), and be at least 6 characters long";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Mock API call - in a real app, you would call an actual API
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo, always succeed if passwords match
      if (formData.newPassword === formData.confirmPassword) {
        toast({
          title: "Password changed successfully",
          className: "bg-secondary text-white animate-slide-in-right",
          duration: 3000,
        });
        onClose();
      } else {
        setErrors({
          ...errors,
          confirmPassword: "Passwords do not match",
        });
      }
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md animate-fade-in">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and a new password
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="oldPassword">Current Password</Label>
              <Input
                id="oldPassword"
                name="oldPassword"
                type="password"
                value={formData.oldPassword}
                onChange={handleChange}
              />
              {errors.oldPassword && (
                <p className="text-destructive text-sm">{errors.oldPassword}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
              />
              {errors.newPassword && (
                <p className="text-destructive text-sm">{errors.newPassword}</p>
              )}
              <div className="text-sm text-medium-gray">
                Password must contain:
                <ul className="list-disc pl-5 mt-1">
                  <li className={formData.newPassword.match(/[A-Z]/) ? "text-secondary" : ""}>At least one uppercase letter</li>
                  <li className={formData.newPassword.match(/[a-z]/) ? "text-secondary" : ""}>At least one lowercase letter</li>
                  <li className={formData.newPassword.match(/\d/) ? "text-secondary" : ""}>At least one digit</li>
                  <li className={formData.newPassword.match(/[@$!%*?&]/) ? "text-secondary" : ""}>At least one special character (@$!%*?&)</li>
                  <li className={formData.newPassword.length >= 6 ? "text-secondary" : ""}>Minimum 6 characters</li>
                </ul>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-destructive text-sm">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
