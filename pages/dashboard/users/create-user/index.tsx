import React from 'react'
import FormCreateUser from 'components/Dashboard/FormCreateUser'
import LayoutDashboard from 'components/Dashboard/LayoutDashboard';
import Template from 'components/Dashboard/Template';
import ButtonGoBack from 'shared/ButtonGoBack';
import Link from 'next/link';
import { UserAddIcon } from '@heroicons/react/outline';

const CreateUserPage = () => {
  return (
      <LayoutDashboard>
          <Template
              title="Lista de usuarios"
              description="Esta es la lista de usuarios y su estado"
          >
              <>
                  <div className="flex gap-4">
                      <ButtonGoBack />
                  </div>
                  <FormCreateUser />
              </>   
          </Template>
      </LayoutDashboard>
  );
}

export default CreateUserPage