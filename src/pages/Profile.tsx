import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import { professorData } from "@/services/mockData";

const Profile = () => {
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const professor = professorData;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl animate-fade-in">
        <h1 className="text-2xl font-bold text-dark-gray mb-8">Profile</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Professor Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-medium-gray">Name</h3>
                <p className="mt-1 text-dark-gray">{professor.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-medium-gray">Email</h3>
                <p className="mt-1 text-dark-gray">{professor.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-medium-gray">Department</h3>
                <p className="mt-1 text-dark-gray">{professor.department}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-medium-gray">Role</h3>
                <p className="mt-1 text-dark-gray">{professor.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-medium-gray mb-4">Password</h3>
              <Button 
                variant="outline" 
                onClick={() => setIsChangePasswordModalOpen(true)}
                className="btn-hover"
              >
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
        <ChangePasswordModal
          isOpen={isChangePasswordModalOpen}
          onClose={() => setIsChangePasswordModalOpen(false)}
        />
      </div>
    </MainLayout>
  );
};

export default Profile;
