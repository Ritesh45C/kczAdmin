import { fetchUtils } from "ra-core";
import { stringify } from "query-string";
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY
} from "react-admin";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({
      Accept: "application/json, text/plain, */*"
    });
  }
  const token = localStorage.getItem("accessToken");
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const daycareId = localStorage.getItem("daycareId");

const apiUrl =
  "https://secret-brushlands-27116.herokuapp.com/api/daycare/" + daycareId;

export default (type, resource, params) => {
  switch (type) {
    case GET_LIST: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        ...fetchUtils.flattenObject(params.filter),
        _sort: field,
        _order: order,
        _start: (page - 1) * perPage,
        _end: page * perPage
      };
      const url = `${apiUrl}/${resource}?${stringify(query)}`;
      if (resource === "childs") {
        return httpClient(url).then(res => {
          var data = res.json;
          data.map(a => {
            return (a.id = a.child.id);
          });
          console.log(data, "this is staff");
          return {
            data: data,
            total: parseInt(
              res.headers
                .get("x-total-count")
                .split("/")
                .pop(),
              10
            )
          };
        });
      }
      return httpClient(url).then(({ headers, json }) => {
        if (!headers.has("x-total-count")) {
          throw new Error(
            "The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
          );
        }
        return {
          data: json,
          total: parseInt(
            headers
              .get("x-total-count")
              .split("/")
              .pop(),
            10
          )
        };
      });
    }

    case GET_ONE: {
      if (resource === "staffs") {
        return httpClient(`${apiUrl}/${resource}/${params.id}`).then(res => {
          var data = res.json.staff;
          data.role = res.json.role;
          console.log(data, "this is staff");
          return { data: data };
        });
      } else {
        return httpClient(`${apiUrl}/${resource}/${params.id}`).then(
          ({ json }) => ({
            data: json
          })
        );
      }
    }

    case GET_MANY: {
      const query = {
        id: params.ids
      };
      const url = `${apiUrl}/${resource}?${stringify(query)}`;
      return httpClient(url).then(({ json }) => ({ data: json }));
    }

    case GET_MANY_REFERENCE: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        ...fetchUtils.flattenObject(params.filter),
        [params.target]: params.id,
        _sort: field,
        _order: order,
        _start: (page - 1) * perPage,
        _end: page * perPage
      };
      const url = `${apiUrl}/${resource}?${stringify(query)}`;

      return httpClient(url).then(({ headers, json }) => {
        if (!headers.has("x-total-count")) {
          throw new Error(
            "The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
          );
        }
        return {
          data: json,
          total: parseInt(
            headers
              .get("x-total-count")
              .split("/")
              .pop(),
            10
          )
        };
      });
    }

    case UPDATE: {
      if (resource === "staffs") {
        const staffUrl = `https://secret-brushlands-27116.herokuapp.com/api/users?password=${params.data.password}`;

        delete params.data.role;
        delete params.data.password;
        delete params.data.registrationDate;
        return httpClient(`${staffUrl}`, {
          method: "PUT",
          body: JSON.stringify(params.data)
        }).then(({ json }) => ({ data: json }));
      }
      if (resource === "payments") {
        var data = {
          id: params.data.id,
          month: params.data.month,
          amount: params.data.amount,
          notes: params.data.notes,
          depositType: params.data.depositType,
          depositedInBank: params.data.depositedInBank,
          depositSlipGenerated: params.data.depositSlipGenerated
        };
        return httpClient(
          `${apiUrl}/${resource}?childId=${params.data.child.id}`,
          {
            method: "PUT",
            body: JSON.stringify(data)
          }
        ).then(({ json }) => ({ data: json }));
      } else {
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(params.data)
        }).then(({ json }) => ({ data: json }));
      }
    }
    case UPDATE_MANY: {
      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: JSON.stringify(params.data)
      }).then(({ json }) => ({
        data: { ...params.data, id: "2" }
      }));
      // Promise.all(
      //   params.ids.map(id =>
      //     httpClient(`${apiUrl}/${resource}/${id}`, {
      //       method: "PUT",
      //       body: JSON.stringify(params.data)
      //     })
      //   )
      // ).then(responses => ({ data: responses.map(({ json }) => json.id) }));
      // break;
    }

    case CREATE: {
      console.log(params.data);
      if (resource === "staffs") {
        var newResource = `${resource}?password=${params.data.password}&type=${params.data.role}`;
        var newData = params.data;
        delete newData.role;
        delete newData.password;
        return httpClient(`${apiUrl}/${newResource}`, {
          method: "POST",
          body: JSON.stringify(newData)
        }).then(({ json }) => ({
          data: { ...newData, id: json.id }
        }));
      }
      if (resource === "payments") {
        var paymentResource = `${resource}?childId=${params.data.id}`;
        var paymentInfo = params.data;
        delete paymentInfo.id;

        return httpClient(`${apiUrl}/${paymentResource}`, {
          method: "POST",
          body: JSON.stringify(paymentInfo)
        }).then(({ json }) => ({
          data: { ...paymentInfo, id: json.id }
        }));
      } else {
        return httpClient(`${apiUrl}/${resource}`, {
          method: "POST",
          body: JSON.stringify(params.data)
        }).then(({ json }) => ({
          data: { ...params.data, id: json.id }
        }));
      }
    }

    case DELETE: {
      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "DELETE"
      }).then(({ json }) => ({ data: json }));
    }

    // case  DELETE_MANY: {
    // return   Promise.all(
    //       params.ids.map(id =>
    //         httpClient(`${apiUrl}/${resource}/${id}`, {
    //           method: "DELETE"
    //         })
    //       )
    //     ).then(responses => ({ data: responses.map(({ json }) => json.id) }))

    // }
    default:
      return null;
  }
};
