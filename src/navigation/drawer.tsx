import React, { useState } from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Alunos from '../app/(app)/alunos';
import Periodos from '../app/(app)/periodos';
import { Dimensions, Platform } from 'react-native';
import CustomDrawer from '../components/CustomDrawer';
import Index from '../app/(app)';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/auth';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const insets = useSafeAreaInsets();
  const {usuario} = useAuth();

  const [isAluno, setIsAluno] = useState(usuario?.matric.substr(0,2) != '85');

  const drawerIcon = ({ focused, size }, name) => {
    return (
      <Icon
        name={name}
        size={size}
        color={focused ? Colors.active : Colors.inactive}
      />
    );
  };
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawer}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.transparent,
        drawerInactiveBackgroundColor: Colors.transparent,
        drawerActiveTintColor: Colors.active,
        drawerInactiveTintColor: Colors.inactive,
        drawerHideStatusBarOnOpen: Platform.OS === 'ios' ? true : false,
        overlayColor: Colors.transparent,
        drawerStyle: {
          backgroundColor: Colors.bg,
          width: Dimensions.get('screen').width - 120,
        },
        sceneContainerStyle: {
          backgroundColor: '#FFF', // fundo atrás das pages
        },
        drawerType: 'slide',
      }}>
      <Drawer.Screen
        name="Home"
        component={Index}
        initialParams={{title: 'Home', icon: 'home'}}
      />
      <Drawer.Screen
        name="Alunos"
        component={Alunos}
        initialParams={{title: 'Usuários', icon: 'account-convert-outline'}}
      />

      <Drawer.Screen
          name="AlunoAdd"
          component={Alunos}
          options={{
            headerTitle: 'Adicionar Usuário',
          }}
        />

      <Drawer.Screen
        name="Periodos"
        component={Periodos}
        initialParams={{title: 'Períodos', icon: 'calendar-sync'}}
      />

      <Drawer.Screen
        name="Calendário"
        component={Alunos}
        initialParams={{title: 'Calendário', icon: 'calendar-month'}}
      />

      <Drawer.Screen
        name="Chat"
        component={Alunos}
        initialParams={{title: 'Chat', icon: 'chat-processing'}}
      />

      <Drawer.Screen
        name="ChatNovo"
        component={Alunos}
        options={{
          headerTitle: 'Chat - Funcionários',
        }}
      />

      <Drawer.Screen
        name="ChatUsuario"
        component={Alunos}        
        options={({route, navigation}) => ({
          headerShown: false,
        })}
      />

    {isAluno ? (
        <>
          <Drawer.Screen
            name="Horario"
            component={Alunos}
            initialParams={{title: 'Horário de Aula', icon: 'timetable'}}
            options={{
              headerTitle: 'Horário de Aula',
            }}
          />

          <Drawer.Screen
            name="Notificacoes"
            component={Alunos}
            initialParams={{title: 'Notificações', icon: 'cellphone-message'}}
            options={{
              headerTitle: 'Notificações',
            }}
          />
          
          {usuario?.parametros?.m_mural == 'S' && (
            <Drawer.Screen
              name="Mural"
              component={Alunos}
              initialParams={{
                title: 'Mural',
                icon: 'newspaper-variant-multiple-outline',
              }}
              options={{
                headerTitle: 'Mural',
              }}
            />
          )}

          {usuario.parametros?.m_fin == 'S' && (
            <Drawer.Screen
              name="FichaFinanceira"
              component={Alunos}
              initialParams={{
                title: 'Ficha Financeira',
                icon: 'account-cash-outline',
              }}
              options={({route, navigation}) => ({                               
                headerTitle: `Ficha Financeira`,
              })}
            />
          )}
          <Drawer.Screen
            name="Viewer"
            component={Alunos}        
            options={({route, navigation}) => ({
              headerShown: false,
            })}
          />
          {usuario.parametros?.m_carteira == 'S' && (
            <Drawer.Screen
              name="CarteiraDigital"
              component={Alunos}
              initialParams={{
                title: 'Carteira Digital',
                icon: 'card-account-details',
              }}
              options={({navigation}) => ({          
                headerTitle: 'Carteira Digital',
                // headerLeft: () => (
                //   <IconButton onPress={() => navigation.navigate('Home')}  
                //   icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="primary.700" />} />
                // ),
              })}
            /> 
          )}

          {usuario.parametros?.m_bol == 'S' && (
            <Drawer.Screen
              name="Boletim"
              component={Alunos}
              initialParams={{title: 'Boletim', icon: 'file-document-outline'}}
              options={({navigation}) => ({        
                // headerRight: () => (<TouchableOpacity style={{ marginRight: 15 }}
                //     onPress={() => navigation.navigate('Viewer', { page: 'boletim' })}>
                //     <AntDesign name="printer" size={30} color={variaveis.primaryColor} />
                //   </TouchableOpacity>
                // ),
                headerTitle: 'Boletim',
              })}        
            />
          )}

          {usuario.parametros?.m_ia == 'S' && (
            <Drawer.Screen
              name="Instrumento"
              component={Alunos}
              initialParams={{
                title: 'Instrumentos de Avaliação',
                icon: 'file-table-box-outline',
              }}
              options={({route, navigation}) => ({                               
                headerTitle: `Instrumentos de Avaliação`,
              })}
            />
          )}
          
          {usuario.parametros?.m_his == 'S' && (
            <Drawer.Screen
              name="Historico"
              component={Alunos}
              initialParams={{title: 'Histórico', icon: 'folder-account-outline'}}
              options={({route, navigation}) => ({                               
                headerTitle: `Histórico`,
              })}
            />
          )}

          <Drawer.Screen
            name="Ocorrencias"
            component={Alunos}
            initialParams={{title: 'Ocorrências', icon: 'folder-alert-outline'}}
            options={{
              headerTitle: 'Ocorrências',
            }}
          />

          <Drawer.Screen
            name="OcorrenciaDetalhe"
            component={Alunos}            
            options={({route, navigation}) => ({                  
              // headerLeft: () => (
              //   <IconButton onPress={() => navigation.navigate('Ocorrencias')}  
              //   icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="primary.700" />} />
              // ),
              headerTitleStyle: {fontSize: 12},
              // headerTitle: `${route.params?.detalhe?.nregoco} - ${route.params?.detalhe?.desoco}`,
            })} 
          />

          {usuario.parametros?.m_fal == 'S' && (
            <Drawer.Screen
              name="Faltas"
              component={Alunos}
              initialParams={{title: 'Faltas', icon: 'calendar-remove-outline'}}
            />
          )}
          
          {usuario.parametros?.m_fre == 'S' && (
            <Drawer.Screen
              name="Catraca"
              component={Alunos}
              initialParams={{
                title: 'Controle de Entrada/Saída',
                icon: 'clock-time-four-outline',
              }}
              options={{
                headerTitle: 'Controle de Entrada/Saída',                
              }}
            />
          )}
          
          {usuario.parametros?.m_age == 'S' && (
            (!usuario.tipo || usuario?.tipo == '1' || usuario?.tipo == '2') ? (
              <Drawer.Screen
                name="Conteudo"
                component={Alunos}
                initialParams={{title: 'Conteúdo', icon: 'calendar-text-outline'}}
                options={{
                  headerTitle: 'Conteúdo',
                }}
              />
            ) : (
              <Drawer.Screen
                name="Agenda"
                component={Alunos}
                initialParams={{title: 'Agenda', icon: 'calendar-text-outline'}}
              />
            )
          )}

          <Drawer.Screen
            name="AgendaDetalhe"
            component={Alunos}
            options={({route, navigation}) => ({        
              // headerLeft: () => (
              //   <IconButton onPress={() => navigation.navigate('Agenda')}  
              //   icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="primary.700" />} />
              // ),
              // headerTitle: `Agenda - ${route.params?.detalhe?.dataf}`,
            })} 
          />

          <Drawer.Screen
            name="ConteudoDetalhe"
            component={Alunos}
            options={({route, navigation}) => ({                  
              // headerLeft: () => (
              //   <IconButton onPress={() => navigation.navigate('Conteudo')}  
              //   icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="primary.700" />} />
              // ),
              // headerTitle: `Conteúdo - ${route.params?.detalhe?.dataf}`,
            })} 
          />

          <Drawer.Screen
            name="ConteudoDetalheDisciplina"
            component={Alunos}
            options={({route, navigation}) => ({                  
              // headerLeft: () => (
              //   <IconButton onPress={() => navigation.navigate('Conteudo')}  
              //   icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="primary.700" />} />
              // ),
              // headerTitle: `Conteúdo - ${route.params?.detalhe?.dataf}`,
            })} 
          />

          <Drawer.Screen
            name="ConteudoDetalheTurma"
            component={Alunos}
            options={({route, navigation}) => ({                  
              // headerLeft: () => (
              //   <IconButton onPress={() => navigation.navigate('Conteudo')}  
              //   icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="primary.700" />} />
              // ),
              // headerTitle: `Conteúdo - ${route.params?.detalhe?.dataf}`,
            })} 
          />

          <Drawer.Screen
              name="DQ"
              component={Alunos}
              initialParams={{page: 'dq', title: 'Declaração de Quitação', icon: 'cash-check'}}
              options={({route, navigation}) => ({                            
                headerTitle: `Declaração de Quitação`,
                headerShown: false,
              })} 
            />
          
          {usuario.parametros?.m_ir == 'S' && (
            <Drawer.Screen
              name="IR"
              component={Alunos}
              initialParams={{
                page: 'ir',
                title: 'Declaração de IR',
                icon: 'file-invoice-dollar',
                FA: true,
              }}
              options={({route, navigation}) => ({                            
                headerTitle: `Declaração de IR`,
                headerShown: false,
              })}
            />
          )}

          <Drawer.Screen
            name="AlteraSenha"
            component={Alunos}
            initialParams={{title: 'Alterar Senha', icon: 'account-key-outline'}}
            options={({route, navigation}) => ({                            
              headerTitle: `Alterar Senha`,
            })}
          />
     
        </>
      ) : (
        <>

          {usuario?.atende == "1" && (
          <Drawer.Screen
            name="ChatConsulta"
            component={Alunos}
            initialParams={{title: 'Consulta Chat', icon: 'wechat'}}
            options={({route, navigation}) => ({
              headerShown: false,
            })}
          />
          )}
        
          <Drawer.Screen
            name="ChatNovoFuncionario"
            component={Alunos}
            options={({navigation}) => ({        
              headerTitle: 'Chat',
              // headerLeft: () => (
              //   <IconButton onPress={() => navigation.navigate('Chat')}  
              //   icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="primary.700" />} >                  
              //   </IconButton>
              // ),
            })}
          />
          
          <Drawer.Screen
            name="GerenciarMural"
            component={Alunos}
            initialParams={{title: 'Gerenciar Mural', icon: 'message-bulleted'}}
            options={({navigation}) => ({        
              headerTitle: 'Gerenciar Mural',
            })}
          />

          <Drawer.Screen
            name="GerenciarMuralDetalhe"
            component={Alunos}
            options={({navigation}) => ({        
              headerTitle: 'Mural Detalhe',
              // headerLeft: () => (
              //   <IconButton onPress={() => navigation.navigate('GerenciarMural')}  
              //   icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="primary.700" />} />
              // ),
            })}
          />
          
          {(usuario.agenda == 'S' || usuario.agenda == '1') && (
            <Drawer.Screen
              name="AgendaListaTurmas"
              component={Alunos}
              initialParams={{title: 'Cadastrar Agenda', icon: 'pencil-box-outline'}}
              options={({navigation}) => ({        
                headerTitle: 'Cadastrar Agenda',                
              })}
            />
          )}

          <Drawer.Screen
            name="AgendaListaAlunos"
            component={Alunos}
            options={({route, navigation}) => ({        
              // headerTitle: `Agenda - (${route.params?.turma.destur})`,
              // headerTitleStyle: {fontSize: 16},
              // headerLeft: () => (
              //   <IconButton onPress={() => navigation.navigate('Home')}  
              //   icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="primary.700" />} />
              // ),
            })}
          />

          <Drawer.Screen
            name="AgendaCadastro"
            component={Alunos}
            options={({route, navigation}) => ({        
              // headerTitle: `Agenda (${route.params?.aluno.nome})`,
              // headerTitleStyle: {fontSize: 16},
              // headerLeft: () => (
              //   <IconButton onPress={() => navigation.navigate('AgendaListaAlunos', {turma: route.params.turma})}  
              //   icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="primary.700" />} />
              // ),
            })}
          />

          
          <Drawer.Screen
            name="AgendaGrupoCadastro"
            component={Alunos}            
            options={({route, navigation}) => ({        
              headerTitle: `Agenda Grupo - Cadastro`,
              // headerLeft: () => (
              //   <IconButton onPress={() => navigation.navigate('AgendaGrupoConsulta')}  
              //   icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="primary.700" />} />
              // ),
            })}
          />

          <Drawer.Screen
            name="AgendaConsultaLancamento"
            component={Alunos}
            initialParams={{title: 'Consultar Agenda', icon: 'account-group-outline'}}
            options={({route, navigation}) => ({        
              headerTitle: `Consultar Agenda`,         
            })}
          />

          <Drawer.Screen
            name="AgendaConsultaLancamentosDetalhe"
            component={Alunos}
            options={({route, navigation}) => ({        
              // headerLeft: () => (
              //   <IconButton onPress={() => navigation.navigate('AgendaConsultaLancamento')}  
              //   icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="primary.700" />} />
              // ),
              // headerTitle: `Agenda - ${route.params?.aluno?.nome}`,
              headerTitleStyle: {fontSize: 12}
            })} 
          />

          <Drawer.Screen
            name="AgendaGrupoConsulta"
            component={Alunos}
            initialParams={{title: 'Agenda Grupo', icon: 'account-group-outline'}}
            options={({route, navigation}) => ({        
              headerTitle: `Agenda Grupo`,    
              // headerRight: () => (
              //   <TouchableOpacity onPress={() => navigation.navigate('AgendaGrupoCadastro')} style={{marginEnd: 10,}}>
              //     <Icon as={MaterialCommunityIcons} color="primary.700" name='chat-plus-outline' size='2xl'/>
              //   </TouchableOpacity>
              // ),          
            })}
          />

          <Drawer.Screen
            name="ConteudoCadastro"
            component={Alunos}
            options={({route, navigation}) => ({        
              // headerTitle: `Conteúdo - ${route.params?.turma?.destur}`,   
              // headerTitleStyle: {fontSize: 16}, 
              // headerLeft: () => (
              //   <IconButton onPress={() => navigation.navigate('AgendaListaTurmas')}  
              //   icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="primary.700" />} />
              // ),
            })}
          />

          <Drawer.Screen
            name="ConteudoCadastroAluno"
            component={Alunos}
            options={({route, navigation}) => ({        
              // headerTitle: `Conteúdo - ${route.params?.turma?.destur}`,   
              // headerTitleStyle: {fontSize: 16}, 
              // headerLeft: () => (
              //   <IconButton onPress={() => navigation.navigate('AgendaListaTurmas')}  
              //   icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="primary.700" />} />
              // ),
            })}
          />

          <Drawer.Screen
            name="ConteudoCadastroDisciplina"
            component={Alunos}
            options={({route, navigation}) => ({        
              // headerTitle: `Conteúdo - ${route.params?.turma?.destur}`,    
              // headerLeft: () => (
              //   <IconButton onPress={() => navigation.navigate('AgendaListaTurmas')}  
              //   icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="primary.700" />} />
              // ),
            })}
          />

          <Drawer.Screen
            name="ConteudoCadastroTurma"
            component={Alunos}
            options={({route, navigation}) => ({        
              // headerTitle: `Agenda - ${route.params?.turma?.destur}`,    
              // headerLeft: () => (
              //   <IconButton onPress={() => navigation.navigate('AgendaListaTurmas')}  
              //   icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="primary.700" />} />
              // ),
            })}
          />

          <Drawer.Screen
            name="ConteudoDetalheFuncio"
            component={Alunos}
            options={({route, navigation}) => ({        
              // headerTitle: `${route.params?.turma.destur} (${route.params?.dataf})`,    
              // headerTitleStyle: { fontSize: 12},              
              // headerLeft: () => (
              //   <IconButton onPress={() => navigation.navigate('AgendaConsultaLancamento')}  
              //   icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="primary.700" />} />
              // ),
            })}
          />          

        </>
      )}

    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const Colors = {
  bg: '#FFF',
  active: '#FFF',
  inactive: '#FFF',
  transparent: 'transparent',
};