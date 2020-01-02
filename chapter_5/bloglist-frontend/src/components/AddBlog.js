import React from 'react'

const AddBlog = (addEntry, title, handleNewTitle, author, handleNewAuthor, url, handleNewUrl) => {

  return  <>
      <form onSubmit={addEntry}>
        <label>
          Title:
          <input value={title} onChange={handleNewTitle} />
        </label>
        <br/>
        <label>
          Author:
          <input value={author} onChange={handleNewAuthor} />
        </label>
        <br/>
        <label>
          Url:
          <input value={url} onChange={handleNewUrl} />
        </label>
        <br/>
        <div>
          <button type="submit">Add new</button>
        </div>
      </form>
    </>
}


export default AddBlog