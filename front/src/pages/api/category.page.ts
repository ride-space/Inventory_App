import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { prisma } from 'src/config/prisma';
import { authOptions } from 'src/pages/api/auth/[...nextauth].page';
import { PostCategorySchema } from 'src/service/categoryApi/categoryApi';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  if (req.method === 'POST') {
    const { name } = req.body;
    const response = PostCategorySchema.safeParse(req.body);
    if (!response.success) {
      res.status(401).json({ message: response.error.message });
    }

    try {
      const category = await prisma.category.create({
        data: {
          name,
          userId: session?.user?.id as string,
        },
      });
      res.status(201).json(category);
    } catch (e: unknown) {
      console.error(e);
      res.status(500).json({ message: 'Category Post Error' });
    }
  }
  res.end();
};
