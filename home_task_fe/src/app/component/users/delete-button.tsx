'use client';

import React, { useTransition } from 'react';
import { deleteUser } from '@/actions/user-actions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type Props = {
  userId: string;
  onUserDeleted: () => void;
};

export const DeleteButton = ({ userId, onUserDeleted }: Props) => {
  const { toast } = useToast();
  const [isLoading, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      try {
        await deleteUser(userId);

        onUserDeleted();
        toast({
          title: 'User Deleted',
          description: 'User has been successfully deleted',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error Deleting User',
          description:
            error instanceof Error
              ? error.message
              : 'An unexpected error occurred',
        });
      }
    });
  };

  return (
    <Button
      variant='destructive'
      size='sm'
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? 'Deleting...' : 'Delete'}
    </Button>
  );
};
