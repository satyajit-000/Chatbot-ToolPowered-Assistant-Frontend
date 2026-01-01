import type React from "react";
import { useAuthStore } from "../../store/auth.store";
import { cn } from "../../lib/utils";

interface ProfileProps {
    profileType?: 'assistant' | 'user'
}

const Profile: React.FC<ProfileProps> = ({ profileType = 'user' }) => {
    const user = useAuthStore((state) => state.user);
    const userProfileText = ((user?.firstName?.[0]?.toUpperCase() ?? '') + (user?.lastName?.[0]?.toUpperCase() ?? '')) || user?.username?.[0]?.toUpperCase() || 'U'
    const profileText = profileType == 'user' ? userProfileText : 'AI'

    return (
        <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-white font-medium",
            profileType == 'assistant' ? 'bg-slate-700 dark:bg-slate-600' : 'bg-blue-600'
        )}>
            {profileText}
        </div>
    )
}
export default Profile;
