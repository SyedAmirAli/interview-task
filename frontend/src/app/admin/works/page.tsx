"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { CreateWorkModal } from "@/components/admin/CreateWorkModal";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { toast, ToastContainer } from "react-toastify";
import { asset, useAxiosFetcher } from "@/lib/hooks";
import Image from "next/image";
import { EditWorkModal } from "@/components/admin/EditWorkModal";
import { EditWorkModalIsIsOpen, Work } from "@/constants/types";

const initialWorks: Work[] = [
    {
        _id: "1",
        title: "Romans & Partners",
        image: "/assets/images/work-1.jpg",
        tags: [{ label: "UI/UX Design" }, { label: "Property Portal" }],
        isLatest: true,
    },
    {
        _id: "2",
        title: "Tech SuperPowers",
        image: "/assets/images/work-2.jpg",
        tags: [{ label: "UI/UX Design" }, { label: "Development" }],
    },
    {
        _id: "3",
        title: "Alveena Casa",
        image: "/assets/images/work-3.jpg",
        tags: [{ label: "UI/UX Design" }, { label: "E-Commerce" }],
    },
];

export default function ManageWorks() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [works, setWorks] = useState<Work[] | unknown>([]);
    const { fetcher } = useAxiosFetcher("/work", "GET", setWorks);
    const [isEditModalOpen, setIsEditModalOpen] =
        useState<EditWorkModalIsIsOpen>({ status: false });

    const handleCreateWork = (newWork: Work) => {
        if (Array.isArray(works)) {
            setWorks([...works, { ...newWork }]);
            setIsModalOpen(false);
        }
    };

    const handleUpdateWork = (newWork: Work) => {
        if (Array.isArray(works)) {
            setWorks(
                works.map((work) =>
                    work._id === newWork._id ? { ...work, ...newWork } : work
                )
            );
            setIsModalOpen(false);
        }
    };

    const handleEditWork = (index: number) => {
        if (Array.isArray(works)) {
            setIsEditModalOpen({
                status: !isEditModalOpen.status,
                data: works[index],
            });
            // TODO: Implement edit functionality
            console.log("Edit work", index);
        }
    };

    const handleDeleteWork = async (id: string) => {
        if (!confirm("Are you sure to delete this record.")) return;

        const response = await fetcher({ method: "DELETE" }, `/work/${id}`);
        console.log("DELETE RESPONSE:", response);

        if (response.status === "success") {
            if (Array.isArray(works)) {
                setWorks(works.filter((work) => work._id !== id));
            }
            toast.success("Deleted Successful.");
        } else {
            toast.error(response?.message);
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Manage Works</h1>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="text-white"
                >
                    Create New Work
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Latest</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.isArray(works) &&
                        works.map((work: Work, index: number) => (
                            <TableRow key={work._id}>
                                <TableCell>{work.title}</TableCell>
                                <TableCell>
                                    <Image
                                        width={36}
                                        height={36}
                                        src={asset(work.image)}
                                        alt={work.title}
                                        className="h-12 w-12 object-cover rounded"
                                    />
                                </TableCell>
                                <TableCell>
                                    {work.tags
                                        .map((tag) => tag.label)
                                        .join(", ")}
                                </TableCell>
                                <TableCell>
                                    {work.isLatest ? "Yes" : "No"}
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                handleEditWork(index)
                                            }
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                handleDeleteWork(work._id)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <CreateWorkModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateWork={handleCreateWork}
            />
            <EditWorkModal
                isOpen={isEditModalOpen as { status: boolean; data: Work }}
                onClose={() =>
                    setIsEditModalOpen({ ...isEditModalOpen, status: false })
                }
                onUpdateWork={handleUpdateWork}
            />
            <ToastContainer />
        </DashboardLayout>
    );
}
