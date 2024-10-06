const allPost = async(search = "") => {
     const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`)
     const data = await res.json()
     displayAllPost(data.posts);
}
allPost();

const displayAllPost = (posts) =>  {
     console.log(posts);
      const cardContainer = document.getElementById('card-container');

      cardContainer.innerHTML = "";
      posts.forEach(post => {
          let div = document.createElement('div');
          div.innerHTML = `
      <div class="p-10 bg-base-200 rounded-3xl flex gap-8">
        <div class="indicator">
          <span class="indicator-item badge ${post.isActive? "bg-green-700":"bg-red-700" }"></span>
          <div class=" h-32 w-32 place-items-center ">
            <img class="rounded-2xl" src=${post.image} alt="">
          </div>
        </div>
        
        <div class="space-y-5 flex-1">
          <div class="flex gap-8 text-sm">
            <span># ${post.category}</span>
            <p>Author: ${post.author.name}</p>
          </div>
          <h6 class="text-xl font-bold">
            ${post.title}
          </h6>
          <p>
            ${post.description}
          </p>
          <hr class="border-b border-gray-400 border-dashed" />
          <div class="flex justify-between">
            <div class="grid grid-cols-3 gap-6">
              <div class="space-x-2">
                <i class="fa-regular fa-comment-dots"></i>
                <span>${post.comment_count}</span>
              </div>
              <div class="space-x-2">
                <i class="fa-regular fa-eye"></i>
                <span>${post.view_count}</span>
              </div>
              <div class="space-x-2">
                <i class="fa-regular fa-clock"></i>
                <span>${post.posted_time} min</span>
              </div>
            </div>
            <span onclick="markAsRead('${post.description}','${post.view_count}')" class="border rounded-full py-1 px-2 bg-[#10B981] hover:bg-[#cfcfcf]">
              <a><i class="fa-regular fa-envelope-open"></i></a>
            </span>
          </div>
        </div>
      </div>
      `;
      cardContainer.appendChild(div);
      });   
}

//search button function

const searchButton = () => {

     const inputValue = document.getElementById('search-input').value;
     allPost(inputValue);
}

//mark as read
const markAsRead = (description, viewCount) => {
     console.log('vai');
     const readCount = document.getElementById('markAsRead');

     const div = document.createElement('div');

     div.innerHTML = `
     <div class="bg-white p-4 rounded-2xl gap-3 flex justify-between">
          <p class="font-semibold">
            ${description}
          </p>
          <div class="flex gap-3 items-center">
            <i class="fa-regular fa-eye"></i>
            <span>${viewCount}</span>
          </div>
     </div>
     `;
     readCount.appendChild(div);
     count();

}

const count = () => {
     const markCount = document.getElementById('count-mark').innerText;
     const convertCount = parseInt(markCount);
     const sum = convertCount + 1;
     document.getElementById('count-mark').innerText = sum;
}