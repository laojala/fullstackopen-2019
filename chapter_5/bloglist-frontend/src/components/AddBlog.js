import React from 'react'

const AddBlog = (addEntry, title, handleNewTitle, author, handleNewAuthor, url, handleNewUrl) => {

  return  <>
      <form onSubmit={addEntry}>
        <label>
          Title:
          <input value={title} onChange={handleNewTitle} data-testid="title"/>
        </label>
        <br/>
        <label>
          Author:
          <input value={author} onChange={handleNewAuthor} data-testid="author"/>
        </label>
        <br/>
        <label>
          Url:
          <input value={url} onChange={handleNewUrl} data-testid="url"/>
        </label>
        <br/>
        <div>
          <button type="submit" data-testid="submit_blog">Add new</button>
        </div>
      </form>
    </>
}


export default AddBlog