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
import { useAxiosFetcher } from "@/lib/hooks";
import { toast } from "react-toastify";
import Image from "next/image";

interface CreateWorkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateWork: (work: any) => void;
}

export function CreateWorkModal({
    isOpen,
    onClose,
    onCreateWork,
}: CreateWorkModalProps) {
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

        const response = await fetcher({
            method: "POST",
            body: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === "success") {
            onCreateWork(response.data);
            resetForm();
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

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Work</DialogTitle>
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
                            required
                        />
                    </div>
                    {image instanceof File && (
                        <div className="p-2">
                            <Image
                                src={URL.createObjectURL(image)}
                                alt="Preview Edit Image"
                                width={200}
                                height={120}
                            />
                        </div>
                    )}
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
                            Create Work
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
