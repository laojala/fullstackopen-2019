import React from 'react'
import { connect } from 'react-redux'

const Users = (props) => {

    const countBlogs = (userId) => {
        return props.blogs.filter(blog => blog.user === userId).length
    }

    if (props.allUsers.length === 0)
        return <div>loading users</div>

    else
        return (
            <>
                <h2>User data</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Blogs created</th>
                        </tr>
                    </thead>
                    <tbody>
                            {props.allUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>
                                    {user.name}
                                    </td>
                                    <td>
                                    {countBlogs(user.id)}
                                    </td>
                                </tr>
                                ))}
                   </tbody>
                </table>
        </>
        )
  }

  const mapStateToProps = (state) => {
    return {
      allUsers: state.allUsers,
      blogs: state.blogs,
    }
  }
  
  const mapDispatchToProps = {
  }

export default connect(mapStateToProps, mapDispatchToProps)(Users)