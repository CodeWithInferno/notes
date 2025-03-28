import Header from "@/components/Header";
import React from "react";
import {  Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription} from "@/components/ui/dialog";
import Header from "../components/Header"; // Adjust path based on structure


const Page = () => {
    return (
        <div>
            <Header />
            <Dialog>
                This is Maria Commit
            </Dialog>
        </div>
    );
};

export default Page;
