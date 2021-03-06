{
  
    //method to submit post data using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(), // converts the data into key value pair content will be the key and value will be the value in the form
                success:function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button'),newPost);
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
      
        <small>
        <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
        </small>

    ${ post.content }<br>
    <small>
    <b>${ post.user.name }</b>
    </small>
    <br>
    <small>
        <a href="/likes/toggle/?id=${post._id}&type=Post" class="toggle-like-button" data-likes="0">
            <%= post.likes.length %> Likes
        </a>
    
    
    
    </small>

    <div class="post-comments">
    
        <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type here to add comment ..." required>
                <input type="hidden" name="post" value="${ post._id}" >
                <input type="submit" value="Add Comment">
        </form>
    
    
    <div class="post-comments-list">
    <ul id="post-comments-${ post._id}">
       
    </ul>
    </div>
    </div>
    </p>
    </li>`);
    }


    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }



















    createPost();
}