import { ComponentType } from "react";

import AdminPost from "pages/home/admin-post";
import NewPost from "pages/home/new-post";
import Trending from "pages/home/trending";
import UserQuestion from "pages/home/user-question";
import PostDetail from "components/home/post-detail";

import {
  PATH_NEW_POST,
  PATH_TRENDING,
  PATH_SHARE,
  PATH_ADMIN_POST,
  PATH_USER_QUESTION,
  PATH_POST_DETAIL,
  PATH_WRITE_POST,
  PATH_UPDATE_POST,
  PATH_USER_DETAIL,
  PATH_USER_DETAIL_POST,
  PATH_USER_DETAIL_SHARE,
  PATH_USER_DETAIL_QUESTION,
  PATH_USER_INFO,
  PATH_LOGIN,
  PATH_USER_PROFILE,
  PATH_ADMIN_POST_LIST,
  PATH_ADMIN_POST_APPROVAL,
  PATH_ADMIN_TAG,
  PATH_ADMIN_USER,
  PATH_ADMIN_USER_ADD,
  PATH_ADMIN_USER_UPDATE,
  PATH_ADMIN_USER_ADD_LIST,
  PATH_TAG_POST_SHARE,
  PATH_TAG_POST_QUESTION,
  PATH_JOB,
  PATH_LIST_TAG,
  PATH_USER_BOOKMARK,
  PATH_USER_FOLLOWING,
  PATH_ADMIN_DOCUMENT,
  PATH_ADMIN_DASHBOARD,
  PATH_ADMIN_DOCUMENT_ADD,
  PATH_ADMIN_DOCUMENT_TYPE,
  PATH_LIST_SEARCH,
  PATH_DOCUMENT
} from "routes/routes.paths";
import CreatePost from "pages/home/writte-post/create";
import EditPost from "pages/home/writte-post/edit";
import UserDetail from "pages/home/user-detail";
import UserDetailPost from "pages/home/user-detail/post";
import UserDetailShare from "pages/home/user-detail/share";
import UserDetailQuestion from "pages/home/user-detail/question";
import UserInformation from "pages/home/user-detail/user-info";
import Login from "pages/login";
import Share from "pages/home/series";
import ListPost from "modules/admin/post/list-post";
import ApprovalPost from "modules/admin/post/approval-post";
import Tag from "modules/admin/tag";
import User from "modules/admin/user";
import CreateUser from "pages/admin/user/create";
import UpdateUser from "pages/admin/user/edit";
import CreateList from "modules/admin/user/create-list";
import TagPostShare from "modules/home/tag/tag-share";
import TagPostQuestion from "modules/home/tag/tag-question";
import Create from "modules/admin/document/document-manager/create";
import ListJob from "pages/home/job-post";
import TagList from "modules/home/tag/tag-list";
import userDetailBookmark from "pages/home/user-detail/bookmark";
import Follow from "pages/home/user-detail/follow";
import Document from "modules/admin/document/document-manager";
import Dashboard from "modules/admin/dashboard";
import DocumentType from "modules/admin/document/document-type";
import ListSearch from "components/home/header/components/search/list-search";
import DocumentLayout from "pages/home/document";

interface RouteModel {
  exact: boolean;
  path: string;
  component: ComponentType;
}

export const appRoutes: RouteModel[] = [
  {
    exact: true,
    path: "/",
    component: AdminPost
  },
  {
    exact: true,
    path: PATH_NEW_POST,
    component: NewPost
  },
  {
    exact: true,
    path: PATH_TRENDING,
    component: Trending
  },
  {
    exact: true,
    path: PATH_SHARE,
    component: Share
  },
  {
    exact: true,
    path: PATH_ADMIN_POST,
    component: AdminPost
  },
  {
    exact: true,
    path: PATH_USER_QUESTION,
    component: UserQuestion
  },
  {
    exact: true,
    path: PATH_POST_DETAIL,
    component: PostDetail
  },
  {
    exact: true,
    path: PATH_JOB,
    component: ListJob
  },
  {
    exact: true,
    path: PATH_LIST_SEARCH,
    component: ListSearch
  },
  {
    exact: true,
    path: PATH_LIST_TAG,
    component: TagList
  },
  {
    exact: true,
    path: PATH_LOGIN,
    component: Login
  },
  {
    exact: true,
    path: PATH_DOCUMENT,
    component: DocumentLayout
  }
];

export const appRoutesWritePost: RouteModel[] = [
  {
    exact: false,
    path: PATH_WRITE_POST,
    component: CreatePost
  },
  {
    exact: false,
    path: PATH_UPDATE_POST,
    component: EditPost
  }
];

export const appRoutesUserDetail: RouteModel[] = [
  {
    exact: true,
    path: PATH_USER_DETAIL,
    component: UserDetail
  },
  {
    exact: true,
    path: PATH_USER_PROFILE,
    component: UserDetail
  }
];

export const appRoutesUserInformation: RouteModel[] = [
  {
    exact: true,
    path: PATH_USER_DETAIL_POST,
    component: UserDetailPost
  },
  {
    exact: true,
    path: PATH_USER_DETAIL_SHARE,
    component: UserDetailShare
  },
  {
    exact: true,
    path: PATH_USER_DETAIL_QUESTION,
    component: UserDetailQuestion
  },
  {
    exact: true,
    path: PATH_USER_INFO,
    component: UserInformation
  },
  {
    exact: true,
    path: PATH_USER_BOOKMARK,
    component: userDetailBookmark
  },
  {
    exact: true,
    path: PATH_USER_FOLLOWING,
    component: Follow
  }
];

export const appRoutesAdmin: RouteModel[] = [
  {
    exact: true,
    path: PATH_ADMIN_POST_LIST,
    component: ListPost
  },
  {
    exact: true,
    path: PATH_ADMIN_POST_APPROVAL,
    component: ApprovalPost
  },
  {
    exact: true,
    path: PATH_ADMIN_TAG,
    component: Tag
  },
  {
    exact: true,
    path: PATH_ADMIN_USER,
    component: User
  },
  {
    exact: true,
    path: PATH_ADMIN_USER_ADD,
    component: CreateUser
  },
  {
    exact: true,
    path: PATH_ADMIN_USER_UPDATE,
    component: UpdateUser
  },
  {
    exact: true,
    path: PATH_ADMIN_USER_ADD_LIST,
    component: CreateList
  },
  {
    exact: true,
    path: PATH_ADMIN_DOCUMENT,
    component: Document
  },
  {
    exact: true,
    path: PATH_ADMIN_DOCUMENT_ADD,
    component: Create
  },
  {
    exact: true,
    path: PATH_ADMIN_DOCUMENT_TYPE,
    component: DocumentType
  },
  {
    exact: true,
    path: PATH_ADMIN_DASHBOARD,
    component: Dashboard
  }
];

export const appRoutesTag: RouteModel[] = [
  {
    exact: true,
    path: PATH_TAG_POST_SHARE,
    component: TagPostShare
  },
  {
    exact: true,
    path: PATH_TAG_POST_QUESTION,
    component: TagPostQuestion
  }
];
