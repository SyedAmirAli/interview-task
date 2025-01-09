"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { asset, useAxiosFetcher } from "@/lib/hooks";
import { toast } from "react-toastify";
import { EditWorkModalIsIsOpen, Work } from "@/constants/types";
import Image from "next/image";

interface EditWorkModal {
    isOpen: EditWorkModalIsIsOpen;
    onClose: () => void;
    onUpdateWork: (work: any) => void;
}

export function EditWorkModal({
    isOpen,
    onClose,
    onUpdateWork,
}: EditWorkModal) {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState<File | string>("");
    const [tags, setTags] = useState("");
    const [isLatest, setIsLatest] = useState(false);

    const { fetcher, error } = useAxiosFetcher("/work");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", image);
        formData.append(
            "tags",
            JSON.stringify(
                tags.split(",").map((tag) => ({ label: tag.trim() }))
            )
        );
        formData.append("isLatest", isLatest.toString());

        const response = await fetcher(
            {
                method: "PUT",
                body: formData,
                headers: { "Content-Type": "multipart/form-data" },
            },
            `/work/${id}`
        );

        console.log("RESPONSE", response);
        if (response.status === "success") {
            onUpdateWork(response.data);
            resetForm();
            onClose();
            toast.success("Work Added Successfully.");
        } else toast.error(response?.message);
    };

    useEffect(
        function () {
            if (error) toast.error(error?.message);
        },
        [error]
    );

    const resetForm = () => {
        setTitle("");
        setImage("");
        setTags("");
        setIsLatest(false);
    };
    useEffect(() => {
        if (isOpen.data) {
            setId(isOpen.data._id);
            setTitle(isOpen.data.title);
            setImage(isOpen.data.image);
            setTags(isOpen.data.tags.map((tag) => tag.label).join(", "));
            setIsLatest(isOpen.data?.isLatest || false);
        }
    }, [isOpen.data]);

    return (
        <Dialog open={isOpen.status} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit New Work</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                            id="image"
                            type="file"
                            onChange={(e) => {
                                const files = e.target.files;
                                if (files && files.length > 0) {
                                    setImage(files[0]);
                                }
                            }}
                        />
                        <div className="p-2">
                            <Image
                                src={
                                    typeof image === "string"
                                        ? asset(image)
                                        : URL.createObjectURL(image)
                                }
                                alt="Preview Edit Image"
                                width={200}
                                height={120}
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        <Input
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="isLatest"
                            checked={isLatest}
                            onCheckedChange={(checked: boolean) =>
                                setIsLatest(checked as boolean)
                            }
                        />
                        <Label htmlFor="isLatest">Is Latest Work</Label>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="font-bold text-white">
                            Update Work
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
