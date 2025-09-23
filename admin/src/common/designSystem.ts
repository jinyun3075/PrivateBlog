//color

// Font definitions
const fontFaces = `
@font-face {
  font-family: 'Pretendard-Black';
  font-weight: 900;
  font-display: swap;
  src: url('/admin/fonts/Pretendard-Black.woff') format('woff');
}

@font-face {
  font-family: 'Pretendard-ExtraBold';
  font-weight: 800;
  font-display: swap;
  src: url('/admin/fonts/Pretendard-ExtraBold.woff') format('woff');
}

@font-face {
  font-family: 'Pretendard-Bold';
  font-weight: 700;
  font-display: swap;
  src: url('/admin/fonts/Pretendard-Bold.woff') format('woff');
}

@font-face {
  font-family: 'Pretendard-SemiBold';
  font-weight: 600;
  font-display: swap;
  src: url('/admin/fonts/Pretendard-SemiBold.woff') format('woff');
}

@font-face {
  font-family: 'Pretendard-Medium';
  font-weight: 500;
  font-display: swap;
  src: url('/admin/fonts/Pretendard-Medium.woff') format('woff');
}

@font-face {
  font-family: 'Pretendard-Regular';
  font-weight: 400;
  font-display: swap;
  src: url('/admin/fonts/Pretendard-Regular.woff') format('woff');
}

@font-face {
  font-family: 'Pretendard-Light';
  font-weight: 300;
  font-display: swap;
  src: url('/admin/fonts/Pretendard-Light.woff') format('woff');
}

@font-face {
  font-family: 'Pretendard-ExtraLight';
  font-weight: 200;
  font-display: swap;
  src: url('/admin/fonts/Pretendard-ExtraLight.woff') format('woff');
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 100;
  font-display: swap;
  src: local('Pretendard Thin'), url('/admin/fonts/Pretendard-Thin.woff') format('woff');
}

html, body {
  padding: 0;
  margin: 0;
  font-family: 'Pretendard-Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}
`;

// Inject font faces into the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = fontFaces;
  document.head.appendChild(style);
}

export const colors = {
  Main:  '#9747FF',
  Black: '#1E1E1E',
  White: '#FFFFFF',
  Hover: '#E7D5FF',
  Gray: {
    0: '#797979',
    100: '#A1A1A1',
    200: '#9CA3AF',
    300: '#3A404B',
  },
  LightGray:{
    0: '#F9FAFB',
    100: '#F3F3F3',
    200: '#E9E9E9',
    300: '#E5E7EB',
    400: '#D1D5DB',
  },
  Error: '#F05252'
};

