const navigation = async (animation, desktopOptions) => {
    // Кнопка вихода з планетки Назад
    const $sloseDescriptionButton = document.querySelectorAll(".main-button-close"),
    $navigationPanel = document.querySelector(".navigation"),
    $openBtnMenu = document.querySelector(".navigation__btn"),
    $closeBtnMenu = document.querySelector(".navigation-pages__close"),
    $listNavigationOnPlanets = document.querySelector(".navigation-planets__list");

    let newArrTitlePlanets = desktopOptions.filter((item) => item.title);
     
     newArrTitlePlanets.forEach((elem) => {
        $listNavigationOnPlanets.innerHTML  += `
            <li class="navigation-planets__list-item">
                <div class="navigation-planets__list-link cursor-pointer"> ${elem.title}</div>
            </li>
       `;
     });

    $sloseDescriptionButton.forEach((buttonItem) => buttonItem.addEventListener("click", () => animation(1)));
    $openBtnMenu.addEventListener("click", () =>  {
        $openBtnMenu.classList.add('active');
        $navigationPanel.classList.add("active");

        document.body.style.overflow = 'hidden';
    });

    $closeBtnMenu.addEventListener("click", () => {
        $openBtnMenu.classList.remove('active');
        $navigationPanel.classList.remove("active");
        
        document.body.style.overflow = 'scroll';
    });

    const $trigersLinks = document.querySelectorAll(".navigation-planets__list-link");

    $trigersLinks.forEach((element, i) => {
            element.addEventListener("click",(e) => {

            $openBtnMenu.classList.remove('active');
            $navigationPanel.classList.remove("active");

            animation(i + 3);
        });
    });
 
};

export default navigation;