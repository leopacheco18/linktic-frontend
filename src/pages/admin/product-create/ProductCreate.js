import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Select,
  Switch,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import ProductsService from "../../../services/ProductsService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCartContext } from "../../../hooks/useCartContext";

const ProductCreate = () => {
  const { productId } = useParams();
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [blockBtn, setBlockBtn] = useState(false);
  const [image, setImage] = useState();
  const [status, setStatus] = useState(true)

  const { isAdmin, checkLogged } = useCartContext();
  const checkAdmin = async () => {
    const admin = await isAdmin();
    if (!admin) {
      localStorage.removeItem("token");
      checkLogged();
      navigate("/");
    }
  };

  useEffect(() => {
    checkAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = async (values) => {
    setBlockBtn(true);
    console.log(values)
    const data = new FormData();
    data.append("name", values.name);
    data.append("price", values.price);
    data.append("description", values.description || '');
    data.append("quantity", values.quantity);
    data.append("created_by", 1);
    data.append("category_id", values.category_id);
    data.append("status", status);

    try {
      if (productId) {
        if(fileList.length > 0){
            data.append("image", fileList[0], fileList[0].name);
        }else{
            data.append("product_id", productId);
            data.append("url_image", image);
            data.append("category", JSON.stringify(categories[0]))
        }
        await ProductsService.update(productId,data);
        messageApi.open({
          type: "success",
          content: "Producto actualizado satisfactoriamente!",
          duration: 2,
        });
      } else {
        data.append("image", fileList[0], fileList[0].name);
        await ProductsService.create(data);
        messageApi.open({
          type: "success",
          content: "Producto creado satisfactoriamente!",
          duration: 2,
        });
      }

      setTimeout(() => {
        navigate("/admin/products");
      }, 2250);
    } catch (error) {
      setBlockBtn(false);
      messageApi.open({
        type: "error",
        content: "Algo salio mal",
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const getCategories = async () => {
    const categories = await ProductsService.getCategories();
    setCategories(categories);
  };

  const getProductById = async () => {
    const product = await ProductsService.getById(productId);
    setStatus(product.status)
    form.setFieldsValue({
      name: product.name,
      price: +product.price,
      quantity: +product.quantity,
      description: product.description,
      category_id: product.category.category_id
    });

    setImage(product.url_image);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (productId) {
      getProductById(productId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const getArr = () => {
    if (productId) {
      return [];
    }
    return [
      {
        required: true,
        message: "Por favor sube una imagen!",
      },
    ];
  };

  return (
    <Form
      form={form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      {contextHolder}
      <Row>
        <Col md={11}>
          <Form.Item
            label="Nombre del producto"
            name="name"
            rules={[
              {
                required: true,
                message: "Por favor ingresa un nombre!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Precio"
            name="price"
            rules={[
              {
                required: true,
                message: "Por favor ingresa un precio!",
              },
            ]}
          >
            <Input type="number" prefix="$" step={0.01} min={0} />
          </Form.Item>
          <Form.Item
            label="Cantidad"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Por favor ingresa una cantidad!",
              },
            ]}
          >
            <Input type="number" min={0} />
          </Form.Item>

          <Form.Item
            label="Categoria"
            name="category_id"
            rules={[
              {
                required: true,
                message: "Por favor seleccione una categoria!",
              },
            ]}
          >
            <Select placeholder="Seleccione una categoria">
              {categories.map((item, index) => (
                <Select.Option key={index} value={item.category_id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Descripción" name="description">
            <TextArea rows={3} />
          </Form.Item>
        </Col>
        <Col offset={2} md={11}>
        <Form.Item label="Estado"  name={'status'}>
            <span style={{display: "none"}}>{JSON.stringify(status)}</span>
          <Switch value={status} onChange={(e) => {
            console.log(e)
            setStatus(e)
          }} />
        </Form.Item>
          <Form.Item label="Dragger">
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
              rules={getArr()}
            >
              <Upload.Dragger {...props} name="files" maxCount={1}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          {productId && (
            <Form.Item label="Imagen">
              <Image src={image} alt="Product" />
            </Form.Item>
          )}
        </Col>
      </Row>

      <Form.Item className="text-right">
        <Link to={'/admin/products'} style={{marginRight: "10px"}}>
        <Button htmlType="button" disabled={blockBtn}>
            Regresar
        </Button>
        </Link>
        <Button type="primary" htmlType="submit" disabled={blockBtn}>
          {productId ? "Actualizar" : "Crear"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductCreate;
