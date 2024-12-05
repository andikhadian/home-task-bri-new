import { Title } from '@/components/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function CreatePage() {
  return (
    <div>
      <Title>Create User</Title>
      <Button variant='outline' asChild>
        <Link href='/dashboard'>Back</Link>
      </Button>
    </div>
  );
}
