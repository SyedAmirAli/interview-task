"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    siteSettingsSchema,
    SiteSettingsType,
    SiteSettingsTypes,
} from "@/constants/types";
import { useAppContext, useAppDispatch } from "@/context/ContextProvider";
import { useAxiosFetcher } from "@/lib/hooks";
import { HOME_PAGE_KEY } from "@/lib/utils";
import { initiateSiteSettings } from "@/context/actions";

export default function SiteSettingsForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useAppDispatch();
    const app = useAppContext();
    const { fetcher } = useAxiosFetcher("/site-item/" + HOME_PAGE_KEY);

    const form = useForm<SiteSettingsTypes>({
        resolver: zodResolver(siteSettingsSchema),
        defaultValues: app.siteSettings,
    });

    const {
        fields: workFields,
        append: appendWork,
        remove: removeWork,
    } = useFieldArray({
        control: form.control,
        name: "heroSection.works",
    });

    const {
        fields: menuFields,
        append: appendMenu,
        remove: removeMenu,
    } = useFieldArray({
        control: form.control,
        name: "stickyMenu.menus",
    });

    const {
        fields: copyrightMenuFields,
        append: appendCopyrightMenu,
        remove: removeCopyrightMenu,
    } = useFieldArray({
        control: form.control,
        name: "footer.copyrightMenus",
    });

    const {
        fields: platformFields,
        append: appendPlatform,
        remove: removePlatform,
    } = useFieldArray({
        control: form.control,
        name: "socials.platforms",
    });

    const onSubmit = async (data: SiteSettingsType) => {
        setIsSubmitting(true);
        try {
            // Simulating API call
            // await new Promise((resolve) => setTimeout(resolve, 2000));HOME_PAGE_KEY
            const response = await fetcher({ method: "PUT", body: data });
            console.log("RESPONSE:", response);
            if (response.status === "success") {
                toast.success("Settings saved successfully!");
                if (
                    response.data &&
                    typeof response.data === "object" &&
                    "value" in response.data
                ) {
                    dispatch(
                        initiateSiteSettings(
                            response.data.value as SiteSettingsType
                        )
                    );
                }
            } else {
                toast.error("SERVER ERROR!");
            }
        } catch (error) {
            toast.error("Failed to save settings. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const availableIcons = ["facebook", "X-twitter", "awwwards", "instagram"];

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 bg-white p-10 rounded-xl"
            >
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="hero-section">
                        <AccordionTrigger>Hero Section</AccordionTrigger>
                        <AccordionContent>
                            <FormField
                                control={form.control}
                                name="heroSection.title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter hero section title"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="heroSection.summery"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Summary</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Enter hero section summary"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {workFields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="flex items-center space-x-2"
                                >
                                    <FormField
                                        control={form.control}
                                        name={`heroSection.works.${index}.title`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Work Title
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter work title"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`heroSection.works.${index}.count`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Count</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        placeholder="Enter count"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => removeWork(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                onClick={() =>
                                    appendWork({ title: "", count: 0 })
                                }
                            >
                                Add Work
                            </Button>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="sticky-menu">
                        <AccordionTrigger>Sticky Menu</AccordionTrigger>
                        <AccordionContent>
                            <FormField
                                control={form.control}
                                name="stickyMenu.title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter sticky menu title"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stickyMenu.summery"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Summary</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Enter sticky menu summary"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {menuFields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="flex items-center space-x-2"
                                >
                                    <FormField
                                        control={form.control}
                                        name={`stickyMenu.menus.${index}.title`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Menu Title
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter menu title"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`stickyMenu.menus.${index}.link`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Link</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter menu link"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`stickyMenu.menus.${index}.count`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Count</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        placeholder="Enter count"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => removeMenu(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                onClick={() =>
                                    appendMenu({
                                        title: "",
                                        link: "",
                                        count: 0,
                                    })
                                }
                            >
                                Add Menu Item
                            </Button>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="footer">
                        <AccordionTrigger>Footer</AccordionTrigger>
                        <AccordionContent>
                            <FormField
                                control={form.control}
                                name="footer.title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter footer title"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="footer.copyrightText"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Copyright Text</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter copyright text"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {copyrightMenuFields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="flex items-center space-x-2"
                                >
                                    <FormField
                                        control={form.control}
                                        name={`footer.copyrightMenus.${index}.title`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Menu Title
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter menu title"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`footer.copyrightMenus.${index}.link`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Link</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter menu link"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() =>
                                            removeCopyrightMenu(index)
                                        }
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                onClick={() =>
                                    appendCopyrightMenu({ title: "", link: "" })
                                }
                            >
                                Add Copyright Menu Item
                            </Button>
                            <FormField
                                control={form.control}
                                name="footer.phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter phone number"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="footer.email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="Enter email address"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="footer.address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Enter address"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="footer.cardTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Card Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter card title"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="footer.cardSummery"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Card Summary</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Enter card summary"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="footer.cardBtnTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Card Button Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter button title"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="footer.cardBtnTarget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Card Button Target
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a target" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="_blank">
                                                    _blank
                                                </SelectItem>
                                                <SelectItem value="_self">
                                                    _self
                                                </SelectItem>
                                                <SelectItem value="_parent">
                                                    _parent
                                                </SelectItem>
                                                <SelectItem value="_top">
                                                    _top
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="footer.cardBtnUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Card Button URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter button URL"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="socials">
                        <AccordionTrigger>Socials</AccordionTrigger>
                        <AccordionContent>
                            <FormField
                                control={form.control}
                                name="socials.title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter socials title"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {platformFields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="flex items-center space-x-2"
                                >
                                    <FormField
                                        control={form.control}
                                        name={`socials.platforms.${index}.title`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Platform Title
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter platform title"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`socials.platforms.${index}.link`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Link</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter platform link"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`socials.platforms.${index}.target`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Target</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a target" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="_blank">
                                                            _blank
                                                        </SelectItem>
                                                        <SelectItem value="_self">
                                                            _self
                                                        </SelectItem>
                                                        <SelectItem value="_parent">
                                                            _parent
                                                        </SelectItem>
                                                        <SelectItem value="_top">
                                                            _top
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`socials.platforms.${index}.icon`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Icon</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="min-w-40">
                                                            <SelectValue placeholder="Select an icon" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {availableIcons.map(
                                                            (iconName) => (
                                                                <SelectItem
                                                                    key={
                                                                        iconName
                                                                    }
                                                                    value={
                                                                        iconName
                                                                    }
                                                                >
                                                                    {iconName}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => removePlatform(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                onClick={() =>
                                    appendPlatform({
                                        title: "",
                                        link: "",
                                        target: "_blank",
                                        icon: "",
                                    })
                                }
                            >
                                Add Social Platform
                            </Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Settings"}
                </Button>
            </form>
            <ToastContainer />
        </Form>
    );
}
