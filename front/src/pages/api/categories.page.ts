import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { prisma } from 'src/config/prisma';
import { authOptions } from 'src/pages/api/auth/[...nextauth].page';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const categories = await prisma.category.findMany({
      select: {
        content: true,
        name: true,
        products: {
          select: {
            id: true,
            date: {
              select: {
                stock: true,
              },
              take: 1,
            },
            lastUpdate: true,
            name: true,
            price: true,
          },
        },
      },
      where: {
        userId: session?.user?.id,
      },
    });
    res.status(200).json(categories);
  } catch (e: unknown) {
    console.error(e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  res.end();
};
