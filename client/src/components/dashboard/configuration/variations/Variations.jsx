import React, { useEffect, useState } from "react";
import s from "./Variations.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSizes, addSize, updateSize, deleteSize } from "../../../../redux/actions/sizeActions";
import { getColors, addColor, updateColor, deleteColor } from "../../../../redux/actions/colorActions";

const Variations = () => {
  const dispatch = useDispatch();
  const sizes = useSelector((state) => state.size.sizes);
  const allSizes = useSelector((state) => state.size.allSizes);
  const colors = useSelector((state) => state.color.colors);
  const allColors = useSelector((state) => state.color.allColors);
  const [selectedTab, setSelectedTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [size, setSize] = useState({
    name: "",
  });
  const [color, setColor] = useState({
    name: "",
    code: "#000000",
  });

  useEffect(() => {
    dispatch(getSizes());
  }, []);

  useEffect(() => {
    dispatch(getColors());
  }, []);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const handleAddSize = async (e) => {
    e.preventDefault();
    await dispatch(addSize(size));
    setSize({
      id: "",
      name: "",
    });
  };

  const handleEditSize = (id) => {
    const sizeToUpdate = allSizes.find((el) => el.id === id);
    setEditMode(true);
    setSize({
      id: sizeToUpdate.id,
      name: sizeToUpdate.name,
    });
  };

  const handleUpdateSize = async (e) => {
    e.preventDefault();
    await dispatch(updateSize({
      id: size.id,
      name: size.name,
    }));
    setEditMode(false);
    setSize({
      id: "",
      name: "",
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSize({
      id: "",
      name: "",
    });
  };

  const handleDeleteSize = async (id) => {
    await dispatch(deleteSize(id));
  };

  const handleAddColor = async (e) => {
    e.preventDefault();
    await dispatch(addColor(color));
    setColor({
      id: "",
      name: "",
      code: "#000000",
    });
  };

  const handleEditColor = (id) => {
    const colorToUpdate = allColors.find((el) => el.id === id);
    setEditMode(true);
    setColor({
      id: colorToUpdate.id,
      name: colorToUpdate.name,
      code: colorToUpdate.code,
    });
  };

  const handleUpdateColor = async (e) => {
    e.preventDefault();
    await dispatch(updateColor({
      id: color.id,
      name: color.name,
      code: color.code,
    }));
    setEditMode(false);
    setColor({
      id: "",
      name: "",
      code: "#000000",
    });
  };

  const handleCancelEditColor = () => {
    setEditMode(false);
    setColor({
      id: "",
      name: "",
      code: "#000000",
    });
  };

  const handleDeleteColor = async (id) => {
    await dispatch(deleteColor(id));
  };

  return (
    <div className={s.container}>
      <div className={s.title}>Variations</div>
    </div>
  );
};


export default Variations;