import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import variaveis from '../config/variaveis';
import ToastManager, { Toast } from 'toastify-react-native'
import IAuthContextData from '../interfaces/IAuthContextData';
import { IUsuario } from '../interfaces/IUsuario';

const AuthContext = createContext<IAuthContextData>(null);

export const AuthProvider = ({children}) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await AsyncStorage.getItem('usuario');
      if (res) {
        setUsuario(JSON.parse(res));
      }      
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {    
    if (usuario)
      if (usuario?.matric?.substr(0,2) !== '85')
      {
        //verificaPendenciaFinanceira();
      }

  }, [usuario]);

  async function signOut() {
    try{
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (token)
      {
        const deleteUsuario = await api.post('/deletetoken', {
          token,
          codigo: usuario.codigo,
          matric: usuario.matric,
        });
      }

      let usuarios = [];
      const _usuarios = await AsyncStorage.getItem('usuarios');
      if (_usuarios) {
        usuarios = JSON.parse(_usuarios);
      }

      let filtro = usuarios.filter(reg => {
        return reg.matric !== usuario.matric;
      });

      if (filtro.length > 0) {
        const user = filtro[0];      
        await AsyncStorage.setItem('usuario', JSON.stringify(user));      
        await AsyncStorage.setItem('usuarios', JSON.stringify(filtro));
        setUsuario(user);
      } else {
        setUsuario(null);
        // navigation.navigate('SignIn');
        await AsyncStorage.clear();
      }
      setLoading(false);
    }catch(err){
      setLoading(false);
    }
  }

  async function setPeriodo(periodo): Promise<void> {
    usuario.escola = periodo.escola;
    usuario.ano = periodo.ano;
    usuario.seqano = periodo.seqano;
    await AsyncStorage.setItem('usuario', JSON.stringify(usuario));      
    setUsuario(usuario);
  }

  async function setUser(user): Promise<void> {
    setUsuario(user);
    await AsyncStorage.setItem('usuario', JSON.stringify(user));
  }

  async function signIn({ codigo, matric, senha }): Promise<void> {
    setLoading(true);
    let usuarios: IUsuario[] = [];
    const users: any = await AsyncStorage.getItem('usuarios');
    if (users)
      usuarios = JSON.parse(users) as IUsuario[];

    try {
      if (codigo === '' || matric === '' || senha === '') {
        Toast.warn('Informe todos os dados!', 'top');
      } else {
        if (matric.substr(0, 2) === '85') {
          const restFun = await api.post('/funcionario/login', {
            codigo,
            matric,
            senha,
          });

          if (restFun.data) {
            const result = await api.get('/funcionario/carregafoto', {
              params: {
                matric,
                codigo,
              },
            });

            if (result.data) {
              await AsyncStorage.setItem(
                matric,
                String(result.data.foto).includes('data:image') ? result.data.foto : 'data:image/jpeg;base64,' + result.data.foto,
              );
            }

            let fun: IUsuario = restFun.data;
            fun.foto = result.data ? result.data.foto : null;
            fun.codigo = codigo;

            usuarios.push(fun);
            await AsyncStorage.setItem('usuario', JSON.stringify(fun));
            await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));

            setUsuario(fun);
            Toast.success('Login efetuado com sucesso.', 'top');
          } else {
            Toast.error('Dados incorretos!','bottom');
          }
        } else {
          // ALUNO
          const _alu = await api.post('/aluno/login', {
            matric,
            senha,
            codigo,
          });

          if (_alu.data) {
            let acessoLiberado = 'S';
            const acesso = variaveis.controledeacesso.find(
              item => item.codigo === codigo,
            );
            if (acesso) {
              if (_alu.data.datnas_respon.length < 1) {
                Toast.info('Aluno não liberado para acesso ao aplicativo.\nPara liberação entre em contato com a secretaria da Escola.', 'top');
                acessoLiberado = 'N';
                setLoading(false);
              }
            }

            const bloq = variaveis.bloqueadas.find(
              item => item.codigo === codigo,
            );
            if (bloq) {
              Toast.info('Encerrado o acesso da Instituição ao aplicativo.\nEntre em contato com a secretaria.', 'top');
              acessoLiberado = 'N';
              setLoading(false);
            }

            if (acessoLiberado === 'S') {
              const result = await api.get('/aluno/carregafoto', {
                params: {
                  escola: _alu.data.escola,
                  matric,
                  codigo,
                },
              });

              api.post('/aluno/alunologado', {
                params: {
                  escola: _alu.data.escola,
                  ano: _alu.data.ano,
                  seqano: _alu.data.seqano,
                  matric,
                  codigo,
                },
              });

              if (result.data) {
                await AsyncStorage.setItem(
                  matric,
                  String(result.data.foto).includes("data:image") ? result.data.foto : "data:image/jpeg;base64," + result.data.foto
                );
              }

              if (result.data?.foto)
                _alu.data.foto = String(result.data.foto).includes("data:image") ? result.data.foto : "data:image/jpeg;base64," + result.data.foto;
                
              _alu.data.codigo = codigo;

              usuarios.push(_alu.data);
              await AsyncStorage.setItem('usuario', JSON.stringify(_alu.data));
              await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
            }
            setUsuario(_alu.data);
            Toast.success('Login efetuado com sucesso', 'top');
          } else {
            Toast.error('Dados incorretos.', 'top');
          }
        }
        setLoading(false);
      }
    } catch (error) {
      Toast.error(error.message, 'top');
      setLoading(false);
    }
  }

  const verificaPendenciaFinanceira = async() => {
    try{
      const result_ficha = await api.get('/fichafinanceira', {
        params: { 
          codigo: usuario.codigo,
          escola: usuario.escola,
          ano: usuario.ano,
          seqano: usuario.seqano,
          matric: usuario.matric,
        },
      });
      
      const financeiro = result_ficha.data.filter(i => !i.datpag);
      
      const financeiro_deb = financeiro.filter(i => (
        (new Date(i.datven.substring(3, 5) + '/' + i.datven.substring(0, 2) + '/' + i.datven.substring(6))) < (new Date())
      ))      

      if (financeiro_deb?.length > 0)
        AsyncStorage.setItem('alunodebito', financeiro_deb.length.toString());
      else
        AsyncStorage.removeItem('alunodebito');

    }catch(e){
      console.log('Erro ao acessar a api', e);
    }
  }
 
  const recarregaAluno = async (aluno: IUsuario): Promise<void> => {
    try{
      const aluno_ = await api.get('aluno', { params: { codigo: aluno.codigo, matric: aluno.matric, ano: aluno.ano, seqano: aluno.seqano }});
      if (aluno_.data?.matric)
      {
        api.post('/aluno/alunologado', {
          codigo: aluno.codigo,
          escola: aluno.escola,
          ano: aluno.ano,
          seqano: aluno.seqano,
          matric: aluno.matric,
        });
        let user = aluno_.data;

        let users: any = await AsyncStorage.getItem('usuarios');    
        users = JSON.parse(users);

        let userList = users.filter((u: any) => u.matric !== user.matric);
        userList.push(user);

        await AsyncStorage.setItem('usuarios', JSON.stringify(userList));
        setUser(user);
      }
    }catch(ex){
      console.log(ex);
    }
  }

  const recarregaFuncionario = async (func: IUsuario): Promise<void> => {
    try{

      const bloq = variaveis.bloqueadas.find(
        item => item.codigo === func.codigo,
      );
      if (bloq) {
        Toast.info('Encerrado o acesso da Instituição ao aplicativo.\nEntre em contato com a secretaria.', 'top');        
        await signOut();
      }

      const funcionario = await api.get('funcionario', {
        params: {
          codigo: func.codigo,
          matric: func.matric,
          ano: func.ano,
          seqano: func.seqano,
        },
      });
      let user = funcionario.data;
      user.codigo = func.codigo;      

      let users: any = await AsyncStorage.getItem('usuarios');    
      users = JSON.parse(users);

      let userList = users.filter((u: any) => u.matric !== user.matric);
      userList.push(user);

      await AsyncStorage.setItem('usuarios', JSON.stringify(userList));
      setUser(user);
    }catch(ex){
    }
  }

  return (    
    <AuthContext.Provider
      value={{
        usuario,
        isLoged: !!usuario,
        signIn,
        signOut,
        setPeriodo,
        setUser,
        loading,
        recarregaAluno,
        recarregaFuncionario,
      }}>
      <ToastManager duration={2000} textStyle={{fontSize: 12}} />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext<IAuthContextData>(AuthContext);
