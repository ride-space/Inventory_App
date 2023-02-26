import {
  Accordion,
  Box,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  Skeleton,
  Table,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import type { CustomNextPage } from 'next';
import { useEffect, useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { AppLayout } from 'src/layout';
import { useGetCategoriesQuery } from 'src/service/categoryApi';
import type { GetCategory } from 'src/service/categoryApi/categoryApi';
import {
  PostCategorySchema,
  usePostCategoryMutation,
} from 'src/service/categoryApi/categoryApi';

const Categories: CustomNextPage = () => {
  const { data: categories, isLoading: categoriesIsLoading } =
    useGetCategoriesQuery();
  const [opened, setOpened] = useState(false);
  const [accordionValue, setAccordionValue] = useState<string | null>(null);
  const [selectData, setSelectData] = useState<GetCategory['name'][]>([]);
  const [selectValue, setSelectValue] = useState<GetCategory['name'] | null>();

  const [filteredValue, setFilteredValue] = useState<GetCategory[]>();
  const [postCategory, { isLoading: postCategoryIsUpdating }] =
    usePostCategoryMutation();

  const form = useForm({
    initialValues: {
      name: '',
    },

    validate: zodResolver(PostCategorySchema),
  });

  const handleSubmit = form.onSubmit(async (values) => {
    await postCategory(values.name);
  });

  // セット検索データ
  useEffect(() => {
    setSelectData([]);
    if (categories) {
      categories.map((ctg) => {
        setSelectData((selectData) => {
          return [...selectData, ctg.name];
        });
      });
    }
    setFilteredValue(categories);
  }, [categories]);

  // FILTER THE DATA BY SELECTED VALUES
  useEffect(() => {
    if (selectValue) {
      setFilteredValue(
        categories?.filter((ctg) => {
          return ctg.name === selectValue;
        }),
      );
    } else {
      setFilteredValue(categories);
    }
  }, [selectValue, categories]);

  return (
    <div>
      <Group align="center" mb="3rem">
        <Title size="1.5rem" weight="500">
          Your Categories
        </Title>
        <ThemeIcon variant="light" color="green" size="md">
          <BiCategory size={25} />{' '}
        </ThemeIcon>
      </Group>
      <Select
        data={selectData}
        value={selectValue}
        onChange={setSelectValue}
        clearable
        searchable
        nothingFound="No Categories Found"
        icon={<FiSearch size={25} />}
        transition="pop-top-left"
        transitionDuration={80}
        transitionTimingFunction="ease"
        sx={{ maxWidth: '600px' }}
        mb="1.5rem"
      />

      {categories?.length === 0 && !categoriesIsLoading && (
        <Box>
          <Group align="center">
            <Text size="lg">No Invetory/Categories </Text>
            <FiSearch size={20} />
          </Group>
        </Box>
      )}

      <Skeleton
        mb="1rem"
        visible={categoriesIsLoading ?? false}
        style={{ marginRight: '80px' }}
        animate
      >
        <Accordion
          value={accordionValue}
          onChange={setAccordionValue}
          transitionDuration={500}
        >
          {filteredValue?.map((category: GetCategory, index) => {
            return (
              <Accordion.Item
                value={category.name}
                sx={{ overFlowX: 'auto' }}
                key={index}
              >
                <Accordion.Control>{category.name}</Accordion.Control>
                <Accordion.Panel
                  sx={{ minWidth: '100%', width: 'max-content' }}
                >
                  <Table verticalSpacing="md" horizontalSpacing="md">
                    <thead>
                      <tr>
                        <th style={{ paddingLeft: '0' }}>Name</th>
                        <th style={{ paddingLeft: '0' }}>Price</th>
                        <th style={{ paddingLeft: '0' }}>Id</th>
                        <th style={{ paddingLeft: '0' }}>Last Updated</th>
                        <th style={{ paddingLeft: '0' }}>Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.products.map((product) => {
                        return (
                          <tr key={product.name}>
                            <td>
                              <div style={{ paddingRight: '1rem' }}>
                                {product.name}
                              </div>
                            </td>
                            <td>
                              <div style={{ paddingRight: '1rem' }}>
                                {product.price}
                              </div>
                            </td>
                            <td>
                              <div style={{ paddingRight: '1rem' }}>
                                {product.id}
                              </div>
                            </td>
                            <td>
                              <div style={{ paddingRight: '1rem' }}>
                                {product.lastUpdate.toString()}
                              </div>
                            </td>
                            <td>
                              <div style={{ paddingRight: '1rem' }}>
                                {product?.date[0]?.stock ?? '0'}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <Group>
                    <Button mt="1.5rem" color="blue">
                      Charge Detail
                    </Button>
                    <Button mt="1.5rem" color="red">
                      Delete
                    </Button>
                  </Group>
                </Accordion.Panel>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Skeleton>
      <Box>
        <Button
          color="blue"
          variant="outline"
          onClick={() => {
            return setOpened(true);
          }}
        >
          Create Category
        </Button>
      </Box>
      <Modal
        opened={opened}
        onClose={() => {
          return setOpened(false);
        }}
        title="create category!"
      >
        <form onSubmit={handleSubmit}>
          <LoadingOverlay
            visible={postCategoryIsUpdating ?? false}
            overlayBlur={2}
            transitionDuration={500}
          />
          <TextInput
            placeholder="category name"
            label="category name"
            withAsterisk
            mb="1rem"
            {...form.getInputProps('name')}
          />
          <Group>
            <Button type="submit">Create Category</Button>
            <Button
              onClick={() => {
                return setOpened(false);
              }}
              color="red"
            >
              Exit
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

Categories.getLayout = AppLayout;
Categories.requireAuth = true;
export default Categories;
