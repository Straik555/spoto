import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { groupApi } from '@api/group'
import { PersonTabs } from '@screens/admin/Users/Users.model'
import { toast } from 'react-toastify'
import { GroupsUserInfo } from '@screens/admin/Users/GroupsDetails/GroupsDetails.model'

const useGroupsDetails = (userId?: string) => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<PersonTabs>(PersonTabs.Main)
  const [groupName, setGroupName] = useState<string>('')
  const [deleteUserVisible, setDeleteUserVisible] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<GroupsUserInfo | null>(null)
  const hiddenFileInput = React.useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<Blob | null>(null)
  const [upload, setUpload] = useState<string | null>(null)

  const { data: groupInfo, isFetching: isFetchingGetGroup } =
    groupApi.endpoints.getGroup.useQuery(Number(userId), {
      skip: !userId,
    })
  const [editGroups, { isLoading: isFetchingEditGroups }] =
    groupApi.endpoints.editGroup.useMutation()
  const changeGroupName = (n: string) => {
    setGroupName(n)
  }
  const [
    deleteGroup,
    {
      isSuccess: isSuccessGroup,
      isError: isErrorGroup,
      isLoading: isLoadingGroup,
    },
  ] = groupApi.endpoints.deleteGroup.useMutation()

  useEffect(() => {
    if (userInfo) {
      setGroupName(userInfo?.name)
    }
  }, [userInfo])

  useEffect(() => {
    if (groupInfo) {
      setUserInfo({
        ...groupInfo,
      })
    }
  }, [groupInfo])

  useEffect(() => {
    if (isSuccessGroup) {
      setDeleteUserVisible(false)
      toast.success('Group deleted successfully')
      router.back()
    }

    if (isErrorGroup) {
      toast.error('Group deletion failed')
    }
  }, [isSuccessGroup, isErrorGroup, router])

  const onEditGroup = (file) => {
    if (groupName.length < 2 || groupName.length > 50) return
    if ((groupName.length > 0 || file) && userInfo?.id) {
      const formData = new FormData()
      if (file) {
        formData.append('avatarFile', file)
      }
      editGroups({
        name: String(groupName || userInfo?.name),
        id: Number(userInfo?.id),
        formData,
      })
    }
  }

  const handleClick = () => {
    if (hiddenFileInput?.current) {
      hiddenFileInput?.current.click()
    }
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const handleChange = async (event: any) => {
    const fileUploaded = event.target.files[0]
    const response = await convertBase64(event.target.files[0])
    setUpload(String(response))
    setFile(fileUploaded)
  }

  return {
    isLoadingGroup,
    userInfo,
    deleteUserVisible,
    deleteGroup,
    setDeleteUserVisible,
    isFetchingGetGroup,
    groupName,
    changeGroupName,
    handleClick,
    handleChange,
    file,
    upload,
    setFile,
    hiddenFileInput,
    isFetchingEditGroups,
    onEditGroup,
    activeTab,
    setActiveTab,
  }
}

export default useGroupsDetails
