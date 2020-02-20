import React, { Component } from 'react';
import { Card, Button, Table, Icon, Modal, Form, Input, message } from 'antd';
import { connect } from 'react-redux'
import { PAGE_SIZE } from '../../config'

import { reqAddCategory } from '../../api'
// actions
// 引入异步action
import { getCategoryAsync } from '../../redux/actions/category-action'

const { Item } = Form

@connect(
  state => ({ categorys: state.categorys}),
  { getCategoryAsync }
)
@Form.create()
class Category extends Component {
  state = {
    visible: false
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  };

  handleOk = () => {
    // 收集数据, 验证数据, 提交后端返回数据, 成功后表单控件重置, 隐藏modal
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("values: ", values)
        let { status, data, msg } = await reqAddCategory(values)
        // 添加分类成功
        if (status === 0) {
          message.success('添加分类成功')
          // 重新请求一次table列表
          this.props.getCategoryAsync()
          this.props.form.resetFields()
          this.setState({ visible: false })
        } else {
          // 新增失败, 应该保持模态框的显示, 也不重置表单控件的内容
          // 从后台获取 添加分类的错误信息, 比如: 添加的分类已经存在, 肯定不能自己写, 后端要做很多判断
          message.warning(msg)
        }
      }
    })
  }

  handleCancel = () => {
    this.props.form.resetFields()
    this.setState({
      visible: false,
    })
  }

  componentDidMount () {
    // 使用异步action发起请求,把数据源保存在redux
    this.props.getCategoryAsync()
  }

  render() {
    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        width: '25%',
        align: 'center',
        render: (category) => {
          return (
            <Button type="link">更新</Button>
          )
        }
      }
    ];

    const addButon = (
      <Button type="primary" onClick={this.showModal}>
        <Icon type="plus-circle"/>新增
      </Button>
    )

    return (
      <>
        <Card extra={addButon}>
          <Table
            bordered
            size="small"
            rowKey="_id"
            dataSource={this.props.categorys}
            columns={columns}
            pagination={{ pageSize: PAGE_SIZE }}
          />
        </Card>
        <Modal
          title="新增分类"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Item>
              {
                this.props.form.getFieldDecorator("name", {
                  rules: [
                    { required: true, message: '输入产品分类名称' }
                  ]
                })(<Input placeholder="输入产品分类名称"/>)
              }
            </Item>
          </Form>
        </Modal>
      </>

    );
  }
}

export default Category
