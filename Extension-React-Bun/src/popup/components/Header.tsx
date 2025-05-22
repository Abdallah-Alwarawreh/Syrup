import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";  
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/popup/components/ThemeProvider";
import { setSettings, getSettingsObject } from "@/lib/settings";
import { getLanguage, languageNames, languages, switchLanguage } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import React, { useState, useEffect } from "react";
import { Save, Globe, Ellipsis, Github, Mail } from "lucide-react";
import { get } from "http";

export default function Header({ pageIcon, pageDomain, couponsFound }: { pageIcon: string, pageDomain: string, couponsFound: number }) {
    const { theme } = useTheme();
    const { setTheme } = useTheme();
    const [language, setLanguage] = useState("en");
    const { t } = useTranslation();
    const updateLanguage = (lang: string): void => {
        setLanguage(lang);
        switchLanguage(lang);
    }
    useEffect(() => {
        getLanguage().then((lang: string) => {
            setLanguage(lang);
        });
    }, [])
    const [openAbout, setOpenAbout] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);

    function share(button: string) {
        if (button === "link") {
            return () => {
                navigator.clipboard.writeText("https://chromewebstore.google.com/detail/syrup-open-beta/odfgjmajnbkiabjnfiijllkihjpilfch");
                toast("Link copied to the clipboard", {
                    action: {
                        label: "Share",
                        onClick: async () => {
                            if (navigator.share) {
                                try {
                                    await navigator.share({
                                        title: 'Syrup',
                                        text: 'Check out this free chrome extension',
                                        url: 'https://chromewebstore.google.com/detail/syrup-open-beta/odfgjmajnbkiabjnfiijllkihjpilfch',
                                    });
                                } catch (error) {
                                    console.error('Error sharing:', error);
                                }
                            } else {
                                console.log("Web Share API is not supported in your browser.");
                            }
                        },
                    },
                });
            };
        } else if (button === "email") {
            return () => window.open(`mailto:?subject=Check%20out%20this%20fantastic%20free%20Chrome%20extension%3A%20Syrup&body=🌟%20Check%20out%20this%20fantastic%20free%20Chrome%20extension%3A%20https%3A%2F%2Fchromewebstore.google.com%2Fdetail%2Fsyrup-open-beta%2Fodfgjmajnbkiabjnfiijllkihjpilfch%0A%0ASyrup%20makes%20it%20easy%20to%20find%20coupons%20online%2C%20helping%20you%20save%20money%20while%20you%20shop.%0A%0AYou%20can%20also%20visit%20their%20website%20for%20more%20information%3A%20https%3A%2F%2Fjoinsyrup.com.%0A%0AHappy%20shopping%20and%20saving!`);
        } else if (button === "discord") {
            return () => window.open("https://discord.gg/jxMDSTmS3E");
        }
    }

    function dialog(dialog: string) {
        if (dialog === "about") {
            return () => {
                setOpenAbout(true);
            };
        } else if (dialog === "settings") {
            return () => {
                setOpenSettings(true);
            };
        }
    }

    const [settings, setSettings] = useState({
        autoCopy: false,
        showIcon: true,
        developer: false,
        dummyData: false,
    });

    useEffect(() => {
        const settings = getSettingsObject();
        settings.then((data) => {
            setSettings({
                autoCopy: data.autoCopy === "true",
                showIcon: data.showIcon === "true",
                developer: data.developer === "true",
                dummyData: data.dummyData === "true",
            });
        });
    }, []);
    
    const handleSaveSettings = async () => {
        await setSettings({
            autoCopy: settings.autoCopy,
            showIcon: settings.showIcon,
            developer: settings.developer,
            dummyData: settings.dummyData,
        });
        toast("Settings saved", {
            duration: 2000,
            action: {
                label: "Undo",
                onClick: () => {
                    setSettings({
                        ...settings,
                        autoCopy: !settings.autoCopy,
                        showIcon: !settings.showIcon,
                        developer: !settings.developer,
                        dummyData: !settings.dummyData,
                    });
                },
            },
        });
        setOpenSettings(false);
    };

    useEffect(() => {
        const handleReload = () => {
            window.location.reload();
        };

        window.addEventListener("reloadCoupons", handleReload);

        return () => {
            window.removeEventListener("reloadCoupons", handleReload);
        };
    }, []);

    return (
        <>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>Syrup</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem onClick={dialog("about")}>{t('about')}</MenubarItem>
                        <MenubarSeparator/>
                        <MenubarSub>
                            <MenubarSubTrigger>{t('share')}</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem onClick={share("link")}>{t('link')}</MenubarItem>
                                <MenubarItem onClick={share("email")}>{t('email')}</MenubarItem>
                                <MenubarItem onClick={share("discord")}>Discord</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarSeparator/>
                        <MenubarItem onClick={dialog("settings")}>{t('settings')}</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>{t('theme')}</MenubarTrigger>
                    <MenubarContent>
                        <MenubarRadioGroup value={theme} onValueChange={setTheme}> {/* Igonre the error, it works */}
                            <MenubarRadioItem value="light">{t('light')}</MenubarRadioItem>
                            <MenubarRadioItem value="dark">{t('dark')}</MenubarRadioItem>
                            <MenubarRadioItem value="system">{t('system')}</MenubarRadioItem>
                        </MenubarRadioGroup>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>{t('language')}</MenubarTrigger>
                    <MenubarContent className="mr-4">
                        <input
                            type="text"
                            placeholder={t('search_lang')}
                            className="w-full p-2 mb-2 text-sm bg-white dark:bg-black text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                            onClick={(e) => e.preventDefault()}
                            onKeyDown={(e) => e.stopPropagation()}
                            onChange={(e) => {
                                e.preventDefault();
                                const searchValue = e.target.value.toLowerCase();
                                const items = document.querySelectorAll('.language-item');
                                items.forEach((item) => {
                                    const text = item.textContent?.toLowerCase() || '';
                                    if (text.includes(searchValue)) {
                                        (item as HTMLElement).style.display = '';
                                    } else {
                                        (item as HTMLElement).style.display = 'none';
                                    }
                                });
                            }}
                        />
                        <MenubarRadioGroup value={language} onValueChange={updateLanguage} className="overflow-y-scroll max-h-[12rem]">
                            {languages.map((lang) => (
                                <MenubarRadioItem className="language-item" value={lang}>{languageNames[lang]}</MenubarRadioItem>
                            ))}
                        </MenubarRadioGroup>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
            { settings.showIcon ? (
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <Avatar className="size-[20px] rounded-md">
                                <AvatarImage src={pageIcon} alt="Page icon" />
                                <AvatarFallback>N/A</AvatarFallback>
                            </Avatar>
                        </MenubarTrigger>
                        <MenubarContent className="mr-4">
                            <MenubarItem>{pageDomain}</MenubarItem>
                            <MenubarItem>{t('coupons_found')}: {couponsFound}</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            ) : <></> }
            <Dialog open={openAbout} onOpenChange={setOpenAbout}>
                <DialogContent className="w-80 rounded-lg">
                    <DialogHeader>
                        <DialogTitle className="text-center">About Syrup</DialogTitle>
                        <DialogDescription className="text-center">The open-source browser extension that helps you save money</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center my-4">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <Avatar>
                                <AvatarImage src="/icons/full.png" alt="Syrup Logo" />
                                <AvatarFallback>SY</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium">Version</h4>
                            <p className="text-sm text-muted-foreground">1.6.0</p>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Developers</h4>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="icon" asChild>
                                    <a href="https://github.com/abstra208" target="_blank" rel="noopener noreferrer">
                                        <Avatar className="h-4 w-4">
                                            <AvatarImage src="https://github.com/abstra208.png" alt="Abstra208's icon" />
                                            <AvatarFallback>A8</AvatarFallback>
                                        </Avatar>
                                        <span className="sr-only">Abstra208</span>
                                    </a>
                                </Button>
                                <Button variant="outline" size="icon" asChild>
                                    <a href="https://https://github.com/Abdallah-Alwarawreh" target="_blank" rel="noopener noreferrer">
                                        <Avatar className="h-4 w-4">
                                            <AvatarImage src="https://github.com/Abdallah-Alwarawreh.png" alt="Abdallah-Alwarawreh's icon" />
                                            <AvatarFallback>AA</AvatarFallback>
                                        </Avatar>
                                        <span className="sr-only">Abdallah-Alwarawreh</span>
                                    </a>
                                </Button>
                                <Button variant="outline" size="icon" asChild>
                                    <a href="https://github.com/imgajeed76" target="_blank" rel="noopener noreferrer">
                                        <Avatar className="h-4 w-4">
                                            <AvatarImage src="https://github.com/imgajeed76.png" alt="Syrup Logo" />
                                            <AvatarFallback>I6</AvatarFallback>
                                        </Avatar>
                                        <span className="sr-only">imgajeed76</span>
                                    </a>
                                </Button>
                                <Button variant="outline" size="icon" asChild>
                                    <a href="https://github.com/Abdallah-Alwarawreh/Syrup/graphs/contributors" target="_blank" rel="noopener noreferrer">
                                        <Ellipsis />
                                        <span className="sr-only">contributors</span>
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <h4 className="font-medium mb-2">Connect with us</h4>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="icon" asChild>
                                    <a href="https://joinsyrup.com" target="_blank" rel="noopener noreferrer">
                                        <Globe className="h-4 w-4" />
                                        <span className="sr-only">Website</span>
                                    </a>
                                </Button>
                                <Button variant="outline" size="icon" asChild>
                                    <a href="https://github.com/Abdallah-Alwarawreh/syrup" target="_blank" rel="noopener noreferrer">
                                        <Github className="h-4 w-4" />
                                        <span className="sr-only">GitHub</span>
                                    </a>
                                </Button>
                                <Button variant="outline" size="icon" asChild>
                                    <a href="https://discord.gg/jxMDSTmS3E" target="_blank" className="hover:underline">
                                        <Mail className="h-4 w-4" />
                                        <span className="sr-only">Email</span>
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <div>
                            <div className="flex space-x-4 text-xs text-muted-foreground">
                                <a href="https://joinsyrup.com/PrivacyPolicy" target="_blank" className="hover:underline">
                                    Privacy Policy
                                </a>
                                <a href="https://discord.gg/jxMDSTmS3E" target="_blank" className="hover:underline">
                                    Help
                                </a>
                            </div>
                        </div>
                        <p className="text-xs text-center text-muted-foreground pt-2">
                            © {new Date().getFullYear()} Syrup. All rights reserved.
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={openSettings} onOpenChange={setOpenSettings}>
                <DialogContent className="w-80 rounded-lg">
                    <DialogHeader>
                        <DialogTitle>Settings</DialogTitle>
                        <DialogDescription>Customize your Syrup preferences.</DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="general" className="mt-4">
                        {settings.developer && (
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="general">General</TabsTrigger>
                                <TabsTrigger value="display">Display</TabsTrigger>
                                <TabsTrigger value="developer">Developer</TabsTrigger>
                            </TabsList>
                        ) || (
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="general">General</TabsTrigger>
                                <TabsTrigger value="display">Display</TabsTrigger>
                            </TabsList>
                        )}
                        <TabsContent value="general" className="space-y-4 mt-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="auto-copy">Auto Copy</Label>
                                    <p className="text-xs text-muted-foreground">Automatically copy the first coupon code to clipboard.</p>
                                </div>
                                <Switch
                                    id="auto-copy"
                                    checked={settings.autoCopy}
                                    onCheckedChange={(checked) => setSettings({ ...settings, autoCopy: checked })}
                                />
                            </div>                            
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="developer-mode">Developer Mode</Label>
                                    <p className="text-xs text-muted-foreground">Enable advanced features and debugging tools for developers.</p>
                                </div>
                                <Switch
                                    id="developer-mode"
                                    checked={settings.developer}
                                    onCheckedChange={(checked) => setSettings({ ...settings, developer: checked })}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="display" className="space-y-4 mt-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="show-icon">Show Icon</Label>
                                    <p className="text-xs text-muted-foreground">Display the website icon in the popup</p>
                                </div>
                                <Switch
                                    id="auto-copy"
                                    checked={settings.showIcon}
                                    onCheckedChange={(checked) => setSettings({ ...settings, showIcon: checked })}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="developer" className="space-y-4 mt-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="dummy-data">Dummy Data</Label>
                                    <p className="text-xs text-muted-foreground">Display dummy data when the domain is invalid.</p>
                                </div>
                                <Switch
                                    id="dummy-data"
                                    checked={settings.dummyData}
                                    onCheckedChange={(checked) => setSettings({ ...settings, dummyData: checked })}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                    <DialogFooter>
                        <Button onClick={handleSaveSettings} className="mt-4">
                            <Save className="h-4 w-4 mr-2" />
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}