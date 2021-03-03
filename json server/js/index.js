// javascript for index.html
const container = document.querySelector('.blogs');
const searchForm = document.querySelector('.search');

const renderPosts = async (term) => { //term == searchForm.term.value.trim()
    let uri = 'http://localhost:3000/posts?_sort=likes&_order=desc';
    if (term) { //if user don't search, term will be undefine
        uri += `&q=${term}` //replace original url to search, q=${term} will find all of json to match
        console.log(uri)
    }

    const res = await fetch(uri);
    const posts = await res.json();

    let template = '';
    posts.forEach(post => {
        template += `
        <div class="post">
            <h2>${post.title}</h2>
            <p><small>${post.likes} likes</small></p>
            <p>${post.body.slice(0,200)}</p>
            <a href='/details.html?id=${post.id}'>read more ... </a>
        <div>
        `
    })

container.innerHTML = template;

}

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    renderPosts(searchForm.term.value.trim())
});

window.addEventListener('DOMContentLoaded',() => renderPosts())

// Life circle of website
// 1.DOMContentLoaded
// 2.Load
// 3.Beforeunload
// 4.Unload