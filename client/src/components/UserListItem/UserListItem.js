import React, { useState } from 'react'
import './UserListItem.css'
import ModalPrivateUser from '../../modals/ModalPrivateUser'

const UserListItem = ({
    users,
    name,
    onChangeMessage,
    onKeyPress,
    onSelectUsername,
    onPrivateUploadFiles,
    selectedUsername,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="user-list-item">
          <h3 className="user-title">Users ({users.length})</h3>
          {users.length > 0 && users.map((user, i) => {
              return (
                <div key={i}>
                    {user.name === name ?
                      (<p className="user you" key={i}>{user.name}</p>) :
                      (<>
                          <p className="user" key={i} onClick={(e) => {
                              setIsOpen(true)
                              onSelectUsername(e)
                          }}>{user.name}</p>
                      </>)}
                </div>
              )
          })}
          <ModalPrivateUser onChangeMessage={onChangeMessage}
                            onKeyPress={onKeyPress}
                            onPrivateUploadFiles={onPrivateUploadFiles}
                            selectedUsername={selectedUsername}
                            setIsOpen={setIsOpen}
                            isOpen={isOpen}
          />
      </div>
    )
}

export default UserListItem