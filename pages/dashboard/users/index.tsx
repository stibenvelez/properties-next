import { UserAddIcon } from '@heroicons/react/solid';
import LayoutDashboard from 'components/Dashboard/LayoutDashboard'
import Template from 'components/Dashboard/Template';
import Link from 'next/link';
import React, { Fragment } from 'react'
import ButtonGoBack from 'shared/ButtonGoBack';
import UserList from '../../../components/Dashboard/UsersList/UserList';

const UsersPage = () => {
    return (
        <LayoutDashboard>
            <Template
                title="Lista de usuarios"
                description="Esta es la lista de usuarios y su estado"
            >
                <Fragment>
                    <div className="flex gap-4">
                        <ButtonGoBack />
                        <Link href="users/create-user">
                            <a>
                                <div className="bg-indigo-600 text-white py-1 px-4 rounded hover:bg-indigo-500 flex gap-2 focus:outline-none transition duration-200 ease-in-out">
                                    <UserAddIcon className="h-5" /> Crear
                                </div>
                            </a>
                        </Link>
                    </div>
                    <UserList />
                </Fragment>
            </Template>
        </LayoutDashboard>
    );
}

export default UsersPage