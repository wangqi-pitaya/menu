import { useEffect, useRef } from 'react';
import menuData from './constants/index.json';

function eventFn(e: any, color: string) {
  const nodeName = e.target.childNodes[0].nodeName.toLowerCase();
  if (nodeName === 'span') {
    e.target.childNodes[0].style.color = color;
  }
}

export default function Menu() {
  const wrapRef: any = useRef();

  useEffect(() => {
    if (wrapRef.current) {
      const node = wrapRef.current;
      node.addEventListener('mouseenter', function(e: any) {
        eventFn(e, 'red');
      }, true);

      node.addEventListener('mouseleave', function(e: any) {
        eventFn(e, 'black');
      }, true);
    }
    return function() {
      const node = wrapRef.current;
      if (node) {
        node.removeEventListener('mouseenter', function(e: any) {
          eventFn(e, 'red');
        }, true);
  
        node.removeEventListener('mouseleave', function(e: any) {
          eventFn(e, 'black');
        }, true);
      }
    }
  }, [])

  const click = (e: any) => {
    const childNode = e.target.parentNode.childNodes;
    childNode.forEach((ele: any, index: number) => {
      if (index > 0) {
        ele.style.display = ele.style.display === 'none' ? 'block' : 'none';
      }
    });
  }

  const getMenuTree = (data: any) => {
    const menuList = []    
    menuList.push(
      <div
        ref={el => { wrapRef.current = el }}
        key={data.id}
        style={{fontSize: '24px'}}
        onClick={click}
      >
        <div>
          {renderId(data.id)}
          <div>{renderChildren(data.children)}</div>
        </div>
      </div>
    )
    return menuList;
  }

  const renderChildren = (childrenList: any) => {
    if (!Array.isArray(childrenList) || childrenList.length === 0) return null;

    return childrenList.map((item: any) => (
      <div key={item.id}>
        <div style={{paddingLeft: '30px'}}>
          {renderId(item.id)}
          <div>{renderChildren(item.children)}</div>
        </div>
      </div>
    ))
  }

  const renderId = (id: string) => <span style={{cursor: 'pointer'}}>{id}</span>

  return (
    <div className='wrap'>{getMenuTree(menuData)}</div>
  )
}
