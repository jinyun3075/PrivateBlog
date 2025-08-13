import 'shared/styles/main.css';
function Main(){
    return(
        <div>
            <header class="site-header">
                <div class="container header-inner">
                <a class="logo" href="/">Tech<span>Log</span></a>
                <nav class="nav">
                    <a class="nav-link is-active" href="#">홈</a>
                    <a class="nav-link" href="#">아티클</a>
                    <a class="nav-link" href="#">주제</a>
                    <a class="nav-link" href="#">소개</a>
                </nav>
                <div class="header-ctrls">
                    <button class="icon-btn" aria-label="검색 열기" title="검색">
                    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M21 21l-4.35-4.35m1.85-4.65a7 7 0 11-14 0 7 7 0 0114 0z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    </button>
                    <button class="menu-btn" aria-expanded="false" aria-controls="mobile-nav">메뉴</button>
                </div>
                </div>

                <nav id="mobile-nav" class="mobile-nav" hidden>
                <a class="mobile-link is-active" href="#">홈</a>
                <a class="mobile-link" href="#">아티클</a>
                <a class="mobile-link" href="#">주제</a>
                <a class="mobile-link" href="#">소개</a>
            </nav>
        </header>
        </div>
    );
 }

 export default Main;