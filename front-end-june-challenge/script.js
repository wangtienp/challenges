document.addEventListener("DOMContentLoaded", () => {
  const innerScroller = document.querySelector("ul");
  const videoLink =[
    'https://youtu.be/YqFTAXm7_Qc?si=DKU14j2T4b9kAVC-',
    'https://youtu.be/ub1_bQCN1y8?si=5sNEZdncqDNQSwvo',
'https://youtu.be/F9T4wXgnX18?si=0YeV3C71uS0LpHBr',
'https://youtu.be/KjUqE73REKw?si=Glf4IAdlJm2rK3BK',
'https://youtu.be/-2EBCtPtiGA?si=9fRnfOcczlLbjciE',
'https://youtu.be/erK6biLIoVg?si=PfuT4ZbWGoVcBkaL',
'https://youtu.be/lDiXLib_DVo?si=KdGQFz_Dqllxqmnl',
'https://youtu.be/gSudm8JWvlQ?si=_PSYiZM2d_NiX9uw',
'https://youtu.be/7laWPxntAIg?si=Au0wsfHfKFwFdxPf',
'https://youtu.be/kBpE9r_eWP8?si=jxMygxv8vQqD9dXZ'
  ]
  const beachesImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQflKKD7S-omsacK5R19meKvL4m7-mGuIvJ1w&s",
    "https://www.visittci.com/thing/grace-bay-beach-pr/default_600x400.jpg",
    "https://i.insider.com/5ae0ae6f7708e928a97edee5?width=700",
    "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/39/98/19.jpg",
    "https://travel.usnews.com/images/playa_paraiso_MrXjJaO.jpg",
    "https://worlds50beaches.com/assets/images/beaches-2024/221.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA0Q5Jf2UCgvtndps1o1CGxr75zGUeK4y-aw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIkpk1Rh40OUbPoQFO3b1v_xf7F2ULGRHb0w&s",
    "https://m.media-amazon.com/images/I/71eXBTO6hVL._UF1000,1000_QL80_.jpg",
    "https://miro.medium.com/v2/resize:fit:650/0*gIMt7-bjl9X-51HP.jpg",
  ];
  const beaches = document.querySelectorAll("ul li h3");
  beaches.forEach((beach, index) => {
    beach.style.backgroundImage = `url(${beachesImages[index]})`;
  });
  // createNewParent();
  createButton();
  addAnimation();

  function addAnimation() {
    const scrollContent = Array.from(innerScroller.children);
    scrollContent.forEach((item) => {
      const duplicated = item.cloneNode(true);
      innerScroller.appendChild(duplicated);
    });
  }
  function createButton() {
    const scrollerContents = document.querySelectorAll("ul li");

    scrollerContents.forEach((content,index) => {
      const anchor = document.createElement("a");  
      const button = document.createElement("button");
      anchor.href = videoLink[index];
      anchor.target = "_blank";
      
      button.textContent = "Explore";
      button.classList.add("explore");
      anchor.appendChild(button);
      content.appendChild(anchor);
      
    });
  }
});
