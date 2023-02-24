import type { CustomNextPage } from 'next';
import { useEffect,useState } from 'react';
import { AppLayout } from 'src/layout';
import {
Table,
Select,
Skeleton,
Modal,
TextInput,
Text,
LoadingOverlay,
Accordion,
Group,
Title,
ThemeIcon

}from "@mantine/core"
import {BiCategory} from "react-icons/bi"
import {FiSearch} from "react-icons/fi"
import {MdWarningAmber} from "react-icons/md"


const Categories: CustomNextPage = () => {
useState()
  useEffect
  return (
  <main>
    <Group align='center' mb='3rem'>
      <Title size="1.5rem" weight="500">
        Your Categories
      </Title>
  <ThemeIcon  variant="light" color="green" size="md"><BiCategory size={25}/> </ThemeIcon>
  <Select clearable searchable nothingFound="No Categories Found" icon={<FiSearch size={25}/> } transition="pop-top-left" transitionDuration={80} transitionTimingFunction='ease' sx={{maxWidth: "600px"}} mb="1.5rem"/>
    </Group>
  </main>
  );
};

Categories.getLayout = AppLayout;
Categories.requireAuth = true;
export default Categories;
