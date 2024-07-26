// "use client";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// import Avatar from "@component/avatar";
// import Hidden from "@component/hidden";
// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
// import TableRow from "@component/TableRow";
// import Pagination from "@component/pagination";
// import { IconButton } from "@component/buttons";
// import Typography, { H5 } from "@component/Typography";

// import { MetaPagination } from "interfaces";
// import CategoryModel from "@models/gathu/categories/category.model";
// import Badge from "@component/badge";
// import allCategoryOptions from "@models/gathu/categories";
// import APP_ROUTES, { API_ROUTES } from "@routes/app.routes";

// // ==============================================================
// interface Props {
//   meta: MetaPagination;
//   categories: CategoryModel[];
// }
// // ==============================================================

// export default function CategorysList({ meta, categories }: Props) {
//   const { push } = useRouter();
//   const [page, setPage] = useState<number | null>(null);

//   useEffect(() => {
//     if (page) {
//       push(`${APP_ROUTES.DASHBOARD.CATEGORY_LIST}?page=${page}`);
//       setPage(null);
//     }
//   }, [page]);

//   return (
//     <>
//       {categories?.map((item) => (
//         <Link href={`${APP_ROUTES.DASHBOARD.CATEGORY_NEW}/${item.id}`} key={item.id}>
//           <TableRow my="1rem" padding="6px 18px">
//             <FlexBox alignItems="center" m="6px" flex="2 2 220px !important">
//               <Avatar src={item.icon} size={36} />
//               <Typography textAlign="left" ml="20px">
//                 {item.name}
//               </Typography>
//             </FlexBox>

//             <H5 m="6px" textAlign="left" fontWeight="400">
//               <Badge title={item.status ? "ATIVO" : "INATIVO"}>{""}</Badge>
//             </H5>

//             <H5 m="6px" textAlign="left" fontWeight="400">
//               {allCategoryOptions.filter((c) => c.value == item.type)[0]?.label}
//             </H5>

//             <Hidden flex="0 0 0 !important" down={769}>
//               <Typography textAlign="center" color="text.muted">
//                 <IconButton>
//                   <Icon variant="small" defaultcolor="currentColor">
//                     arrow-right
//                   </Icon>
//                 </IconButton>
//               </Typography>
//             </Hidden>
//           </TableRow>
//         </Link>
//       ))}

//       <FlexBox justifyContent="center" mt="2.5rem">
//         <Pagination page={1}
//           pageCount={Math.ceil((meta?.total || 0) / (meta?.size || 1)) || 1}
//           onChange={(data) => setPage(data + 1)}
//         />
//       </FlexBox>
//     </>
//   );
// }
