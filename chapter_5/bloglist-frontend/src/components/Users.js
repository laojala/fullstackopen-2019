import React from 'react'
import { connect } from 'react-redux'

const Users = (props) => {

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
                                    {user.blogs.length}
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
    }
  }
  
  const mapDispatchToProps = {
  }

export default connect(mapStateToProps, mapDispatchToProps)(Users)