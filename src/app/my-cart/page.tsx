import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Total } from "../components/Total";
import { removeItemFromCartAction } from "../server-actions/cart.action";
import { getCart } from "../service/CartService";
import { getProductsByIds } from "../service/ProductService";
import Header from "../components/Header";

async function MyCartPage() {
  const cart = getCart();
  // console.log(cart);

  // Obtendo os produtos por IDs
  const products = await getProductsByIds(
    cart.items.map((item) => item.product_id)
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "8px",
      }}
    >
      <Header />
      <Typography variant="h3">
        <ShoppingCartIcon /> Meu carrinho
      </Typography>
      <Grid2 container>
        <Grid2 xs={12} md={7} sx={{ p: 2 }}>
          <List>
            {cart.items.map((item, index) => {
              const product = products.find(
                (product: any) => product.id === item.product_id
              );

              // Verificar se o produto foi encontrado
              if (!product) return null;

              return (
                <React.Fragment key={index}>
                  <ListItem
                    sx={{ display: "flex", alignItems: "flex-start", mt: 3 }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={product.images?.[0]?.src}
                        alt={product.name}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="button">
                            {product.name} - Qtd. {item.quantity}
                          </Typography>
                          <Typography sx={{ color: "primary.main" }}>
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(item.total)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <ListItem
                    sx={{ display: "flex", justifyContent: "end", p: 0 }}
                  >
                    <form action={removeItemFromCartAction}>
                      <input type="hidden" name="index" value={index} />
                      <Button
                        color="error"
                        startIcon={<DeleteIcon />}
                        type="submit"
                      >
                        Excluir
                      </Button>
                    </form>
                  </ListItem>
                  <Divider variant="inset" component="li" sx={{ ml: 0 }} />
                </React.Fragment>
              );
            })}
            {!cart.items.length && (
              <ListItem>
                <ListItemText>Nenhum item no carrinho</ListItemText>
              </ListItem>
            )}
          </List>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Total total={cart.total} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
            {cart.items.length ? (
              <Button LinkComponent={Link} href="/checkout">
                Finalizar compra
              </Button>
            ) : (
              <Button LinkComponent={Link} href="/store">
                Continuar comprando
              </Button>
            )}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default MyCartPage;
