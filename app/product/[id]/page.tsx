import React from "react";
import { notFound } from "next/navigation";
import { siteData } from "../../../data/siteData";
import ProductViewClient from "./ProductViewClient";

export function generateStaticParams() {
  return siteData.allProducts.map((product) => ({
    id: product.slug
  }));
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = siteData.allProducts.find(
    (p) => p.slug === id || p.id === id
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = siteData.allProducts.filter(
    (p) => p.slug !== product.slug
  );

  return (
    <ProductViewClient
      product={product}
      relatedProducts={relatedProducts}
      headerData={siteData.header}
      footerData={siteData.footer}
    />
  );
}
