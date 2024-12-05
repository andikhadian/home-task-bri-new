import { Title } from '@/components/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function DetailPage() {
  return (
    <div>
      <Title>User Detail</Title>
      <Button variant='outline' asChild>
        <Link href='/dashboard'>Back</Link>
      </Button>
    </div>
  );
}
