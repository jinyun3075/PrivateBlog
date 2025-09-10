
// SNB 
export const SIDEBAR_WIDTH = 216;

export type MenuItem = {
  label: string;
  path?: string;
  children?: MenuItem[];
};

export const MENU_CONFIG: MenuItem[] = [
  { label: "대시보드", path: "/dashboard" },
  {
    label: "노출관리",
    children: [{ label: "TOP 헤드라인 관리", path: "/topHeadline" }],
  },
  {
    label: "콘텐츠 관리",
    children: [
      { label: "게시글 관리", path: "/post" },
      { label: "카테고리 관리", path: "/category" },
    ],
  },
];



