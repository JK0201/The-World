import axios, { AxiosError, AxiosResponse } from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:8080',
// });

const api = axios.create();

const init = async () => {
  try {
    const res = await api.get('/api/list');
    if (res.status === 200) return res.data;
  } catch (err) {
    console.error(err.response);
  }
};

const postItem = (formData: FormData) => {
  api({
    method: 'POST',
    url: '/api/addpost',
    data: formData,
  })
    .then((res: AxiosResponse) => {
      alert(res.data);
      window.location.reload();
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        alert(err.response.data);
      } else {
        alert('서버에 연결에 실패했습니다\n잠시후 다시 시도해주세요');
      }
    });
};

const deleteItem = (id: number, password: string) => {
  api({
    method: 'DELETE',
    url: `/api/delpost/${id}`,
    data: password,
  })
    .then((res: AxiosResponse) => {
      alert(res.data);
      window.location.reload();
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        alert(err.response.data);
      } else {
        alert('서버에 연결에 실패했습니다\n잠시후 다시 시도해주세요');
      }
    });
};

const updateItem = (id: number, formData: FormData) => {
  api({
    method: 'PUT',
    url: `/api/updatepost/${id}`,
    data: formData,
  })
    .then((res: AxiosResponse) => {
      alert(res.data);
      window.location.reload();
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        alert(err.response.data);
      } else {
        alert('서버에 연결에 실패했습니다\n잠시후 다시 시도해주세요');
      }
    });
};

export { init, postItem, deleteItem, updateItem };
