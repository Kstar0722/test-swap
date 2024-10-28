'use client';

import Link from 'next/link';

import { Button, Table, Td, Th, Tr, Typography } from '@/components';
import { useStakeContext } from '@/contexts/StakeContext';
import { BackSvg } from '@/svgs';

export const StakeTransactions = () => {
  const {
    stakeInfo: { transactions },
  } = useStakeContext();

  return (
    <>
      {/* Top section */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between px-3 gap-2">
        <div className="flex flex-row items-center gap-4">
          <Link href="/stake">
            <BackSvg width={32} height={32} />
          </Link>
          <Typography className="text-2xl font-bold">Stake</Typography>
        </div>
        <div className="flex flex-row items-center gap-4 justify-end sm:justify-start">
          <Link href="/stake/view-stake">
            <Button size="medium" outline={true} className="shadow-xl lg:shadow-none">
              View Stakes
            </Button>
          </Link>
          <Link href="/stake/stake-now">
            <Button size="medium" className="shadow-xl lg:shadow-none">
              Stake Now
            </Button>
          </Link>
        </div>
      </div>
      {/* Main section */}
      <div className="bg-white rounded-2xl">
        <div className="flex flex-col min-h-[180px] pb-4 overflow-x-auto">
          <Table>
            <thead>
              <Tr>
                <Th>Date/Time</Th>
                <Th>Source</Th>
                <Th>Destination</Th>
                <Th>Source Transaction</Th>
                <Th>Destination Transaction</Th>
                <Th>Status</Th>
              </Tr>
            </thead>
            <tbody>
              {transactions.map((item, index) => (
                <Tr key={index}>
                  <Td className="px-4">{item.date}</Td>
                  <Td className="px-4">{item.source}</Td>
                  <Td className="px-4">{item.destination}</Td>
                  <Td className="px-4">{item.sourceTransaction}</Td>
                  <Td className="px-4">{item.destinationTransaction}</Td>
                  <Td className="px-4">{item.status}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
