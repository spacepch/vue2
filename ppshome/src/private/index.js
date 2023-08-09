import { MessageBox } from 'element-ui'

const data = '禁止查询作者的信息yo~';

export const qqFilter = (keyword) => {
    if (keyword == '2606249268') {
        try {
            MessageBox.confirm(data, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                lockScroll:false
            })
        } catch (error) {
            alert(data)
        }
        return true;
    }
}
export const biliFilter = (keyword) => {
    if (keyword == '388609984') {
        try {
            MessageBox.confirm(data, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                lockScroll:false
            })
        } catch (error) {
            alert(data)
        }
        return true;
    }
}
export const gitFilter = async (keyword) => {
    if (keyword == 'spacepch') {
        try {
            MessageBox.confirm(data, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                lockScroll:false
            })
        } catch (error) {
            alert(data)
        }
        return true;
    }
} 