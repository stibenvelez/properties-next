import LayoutDashboard from 'components/Dashboard/LayoutDashboard'
import PropertiesList from 'components/Dashboard/PropertiesList';
import Template from 'components/Dashboard/Template'
import React from 'react'

const PropertiesListPage = () => {
  return (
      <LayoutDashboard>
          <Template title='Lista de inmuebles' description='Este es el listado de los inmuebles registrados'>
             <PropertiesList/>
          </Template>
      </LayoutDashboard>
  );
}

export default PropertiesListPage;