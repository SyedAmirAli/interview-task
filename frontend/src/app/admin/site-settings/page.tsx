import DashboardLayout from "@/components/admin/DashboardLayout";
import React from "react";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";

export default function SiteSettingsPage() {
    return (
        <DashboardLayout>
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Site Settings</h1>
                <SiteSettingsForm />
            </div>
        </DashboardLayout>
    );
}
