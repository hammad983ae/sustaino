import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AuthStatus() {
  const navigate = useNavigate();

  // Always show as if user is logged in (no auth required)
  const initials = 'DPG'; // DeLorenzo Property Group

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">
              DeLorenzo Property Group
            </p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              Property Management Platform
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/work-hub')}>
          <UserIcon className="mr-2 h-4 w-4" />
          Work Hub
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/property-valuations')}>
          <Settings className="mr-2 h-4 w-4" />
          Manage Valuations
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/white-label')}>
          <Settings className="mr-2 h-4 w-4" />
          White Label Config
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}